import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Filler,
  BarElement,
  CategoryScale,
  ChartOptions,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';
import { DateTime } from 'luxon';

import { COLORS } from '../../../../constants';

import { Wrapper } from './styles';
import { prepareDataForChart } from '../../../../utils/prepareDataForChart';
import { IDevice, IRate, IMaxPower } from '../../../../types';

interface ChartProps {
  devices: IDevice[];
  rates: IRate[];
  maxPower: IMaxPower['value'];
  isFetching: boolean;
}

export const Chart: React.FC<ChartProps> = ({
  devices,
  rates,
  maxPower,
  isFetching,
}) => {
  ChartJS.register(
    TimeScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    LinearScale,
    Filler,
    BarElement,
    ArcElement,
    CategoryScale
  );

  const chart = prepareDataForChart(devices, rates, maxPower, isFetching);

  if (!chart.length) {
    return null;
  }

  const names = [ ...devices ].map((item) => item.name);

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    scales: {
      y: {
        stacked: true,
      },
      x: {
        position: 'top',
        min: DateTime.now().startOf('day').toISO()?.toString(),
        max: DateTime.now().plus({ day: 1 }).startOf('day').toISO()?.toString(),
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { raw: any }) => {
            const formattedTime = (time: string) => DateTime.fromISO(time).toFormat('HH:mm');
            return `${formattedTime(context.raw[0])}-${formattedTime(context.raw[1])}`
          },
        },
      },
    },
  };

  const array = chart.map((item) => item.length).sort((a, b) => a - b);
  const sectorCount = array.at(-1);
  const sectors = Array.from({ length: sectorCount as number }, (_, i) => i);

  const data = {
    labels: names,
    datasets: sectors.map((item) => ({
      data: chart.map((chartItem) => chartItem[item]),
      backgroundColor: Object.values(COLORS),
    })),
  };

  return (
    <Wrapper>
      <Bar options={options} data={data} />
    </Wrapper>
  );
};
