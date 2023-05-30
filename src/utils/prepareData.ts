import { type IDevice, type IMaxPower, type IRate, type Hour } from '../types';
import { MODES, HOURS_COUNT } from '../constants';

interface TResult {
  usedPower: number;
  cost: number;
  ids: string[];
}

export type Result = Record<Hour, TResult>;

const devicePredicate = (mode: IDevice['mode'], rate: IRate): boolean =>
  Boolean(
    (mode === MODES.night.name && rate.from >= MODES.night.end && rate.from < MODES.night.start) ||
      (mode === MODES.day.name && (rate.from < MODES.day.start || rate.from >= MODES.day.end))
  );

const hoursDetermination = (
  device: IDevice,
  rate: IRate,
  maxPower: IMaxPower['value'],
  result: Result,
  currentDuration: number
): number => {
  for (let hour = rate.from; hour !== rate.to && currentDuration < device.duration; hour = (hour + 1) % HOURS_COUNT) {
    const key = hour.toString() as Hour;
    const currentPower = (result[key]?.usedPower || 0) + device.power;
    if (currentPower <= maxPower) {
      if (result[key]) {
        result[key].usedPower += device.power;
        result[key].cost += device.power * rate.value;
        result[key].ids.push(device.id);
      } else {
        result[key] = {
          usedPower: device.power,
          cost: device.power * rate.value,
          ids: [ device.id ],
        };
      }

      currentDuration++;
    }
  }
  return currentDuration;
};

const distributionOfDevicesOverTime = (
  device: IDevice,
  rates: IRate[],
  maxPower: IMaxPower['value'],
  result: Result
): Result => {
  let currentDuration: number = 0;

  rates.forEach((rate) => {
    if (!devicePredicate(device.mode, rate)) {
      currentDuration = hoursDetermination(device, rate, maxPower, result, currentDuration);
    }
  });
  return result;
};

export const prepareData = (devices: IDevice[], rates: IRate[], maxPower: IMaxPower['value'], isFetching: boolean): Result => {
  let result: Result = {} as Result;

  if (isFetching) {
    return result;
  }

  devices.forEach((device) => {
    result = distributionOfDevicesOverTime(device, rates, maxPower, result);
  });
  return result;
};
