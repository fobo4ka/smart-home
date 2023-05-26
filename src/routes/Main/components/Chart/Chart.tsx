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
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';
import { DateTime } from 'luxon';

import { useChart, useData } from '../../../../hooks';

import { COLORS } from '../../../../constants';

import { Wrapper } from './styles';

export const Chart = (): React.ReactNode => {
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

  const [devices, rates, maxPower, isFetching] = useData();
  const chart = useChart(devices, rates, maxPower, isFetching);

  if (!chart.length) {
    return;
  }

  const names = [...devices].map((item) => item.name);

  const options = {
    indexAxis: 'y',
    scales: {
      y: {
        stacked: true,
      },
      x: {
        position: 'top',
        min: DateTime.now().startOf('day').toISO(),
        max: DateTime.now().plus({ day: 1 }).startOf('day').toISO(),
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
          label: (context) => {
            const formattedTime = (time) => DateTime.fromISO(time).toFormat('HH:mm');
            return `${formattedTime(context.raw[0])}-${formattedTime(context.raw[1])}`;
          },
        },
      },
    },
  };

  const array = chart.map(item => item.length).sort((a, b) => a - b);
  const sectorCount = array.pop();
  const sectors = Array.from({ length: sectorCount }, (v, i) =>  i + 1);

  console.log(sectorCount);

  const data = {
    labels: names,
    datasets:


    //     sectors.map(item => (
    //     {
    //       data: chart.map((chartItem) => chartItem[item]) || [],
    //       backgroundColor: Object.values(COLORS),
    //     }
    // ))

        [
      {
        data: chart.map((item) => item[0]),
        backgroundColor: Object.values(COLORS),
      },
      {
        data: chart.map((item) => item[1]),
        backgroundColor: COLORS.transparent,
      },
      {
        data: chart.map((item) => item[2]),
        backgroundColor: Object.values(COLORS),
      },
      {
        data: chart.map((item) => item[3]),
        backgroundColor: Object.values(COLORS),
      },
    ],
  };

  return (
    <Wrapper>
      <Bar options={options} data={data} type='line' />
    </Wrapper>
  );
};
