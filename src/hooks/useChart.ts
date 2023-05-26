import { DateTime } from 'luxon';

import { usePrepareData } from '../hooks';
import { type IDevice, type IMaxPower, type IRate } from '../types';

const HOURS_IN_DAY = 24;

export const useChart = (devices: IDevice[], rates: IRate[], maxPower: IMaxPower, isFetching) => {
  const data = usePrepareData(devices, rates, maxPower, isFetching);

  if (!data) {
    return [];
  }

  const dataNew = {};
  let chartData = [];

  if (Object.keys(data).length > 0) {
    devices.forEach((device) => {
      Object.values(data).forEach((item, key) => {
        if (item?.ids?.includes(device.id)) {
          if (dataNew[device.id]) {
            dataNew[device.id].push(key);
          } else {
            dataNew[device.id] = [key];
          }
        }
      });
    });

    chartData = Object.values(dataNew).map((item) => {
      const result = [];
      if (item.length === HOURS_IN_DAY) {
        result[0] = [DateTime.now().startOf('day').toISO(), DateTime.now().plus({ day: 1 }).startOf('day').toISO()];
      } else {
        let part = 0;
        item.forEach((i, index) => {
          const startHour = DateTime.now().set({ hour: i, minute: 0, second: 0, millisecond: 0 }).toISO();
          const endHour = DateTime.now()
            .set({ hour: (i as number) + 1, minute: 0, second: 0, millisecond: 0 })
            .toISO();

          if (index === 0) {
            part = 0;
            result.push([startHour, endHour]);
          } else {
            if (result[part][1] === startHour) {
              result[part][1] = endHour;
            }
            if (result[part][1] !== startHour) {
              part += 1;
              result.push([startHour, endHour]);
            }
          }
        });
      }
      return result;
    });
  }

  return chartData;
};
