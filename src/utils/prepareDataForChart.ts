import { DateTime } from 'luxon';

import { type IDevice, type IMaxPower, type IRate } from '../types';
import { prepareData } from './prepareData';
import { HOURS_COUNT } from '../constants';

const formattedDate = (item: number[]) => {
  let result: Array<string[]> = [];
  if (item.length === HOURS_COUNT) {
    result.push([ DateTime.now().startOf('day').toISO() || '', DateTime.now().plus({ day: 1 }).startOf('day').toISO() || '' ]);
  } else {
    let part = 0;
    item.forEach((i, index) => {
      const startHour = DateTime.now().set({ hour: i, minute: 0, second: 0, millisecond: 0 }).toISO() || '';
      const endHour = DateTime.now()
        .set({ hour: (i as number) + 1, minute: 0, second: 0, millisecond: 0 })
        .toISO() || '';
      if (index === 0) {
        part = 0;
        result.push([ startHour, endHour ]);
      } else {
        if (result[part][1] === startHour) {
          result[part][1] = endHour;
        }
        if (result[part][1] !== startHour) {
          part += 1;
          result.push([ startHour, endHour ]);
        }
      }
    });
  }
  return result;
};

export const prepareDataForChart = (
  devices: IDevice[],
  rates: IRate[],
  maxPower: IMaxPower['value'],
  isFetching: boolean
): Array<string[]>[] => {
  const data = prepareData(devices, rates, maxPower, isFetching);

  if (!Object.keys(data).length) {
    return [];
  }

  const dataNew: { [key: string]: number[] } = {};

  devices.forEach((device) => {
    Object.values(data).forEach((item, key) => {
      if (item?.ids?.includes(device.id)) {
        if (dataNew[device.id]) {
          dataNew[device.id].push(key);
        } else {
          dataNew[device.id] = [ key ];
        }
      }
    });
  });

  return Object.values(dataNew).map((item) => formattedDate(item)) || [];
};
