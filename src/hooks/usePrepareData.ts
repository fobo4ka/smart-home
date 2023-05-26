import { type IDevice, type IMaxPower, type IRate, type Hour } from '../types';
import { MODES, HOURS_COUNT } from '../constants';

interface TResult {
  usedPower: number;
  cost: number;
  ids: string[];
}

type Result = Record<Hour, TResult> | Record<string, unknown>;

const devicePredicate = (mode: IDevice['mode'], rate: IRate): boolean =>
  Boolean(
    (mode === MODES.night.name && rate.from >= MODES.night.end && rate.from < MODES.night.start) ||
      (mode === MODES.day.name && (rate.from < MODES.day.start || rate.from >= MODES.day.end))
  );

const hoursDetermination = (
  device: IDevice,
  rate: IRate,
  maxPower: IMaxPower,
  result: Result,
  currentDuration: number
): number => {
  for (let hour = rate.from; hour !== rate.to && currentDuration < device.duration; hour = (hour + 1) % HOURS_COUNT) {
    const currentPower = (result[hour]?.usedPower || 0) + device.power;
    if (currentPower <= maxPower) {
      if (result[hour]) {
        result[hour].usedPower += device.power;
        result[hour].cost += device.power * rate.value;
        result[hour].ids.push(device.id);
      } else {
        result[hour] = {
          usedPower: device.power,
          cost: device.power * rate.value,
          ids: [device.id],
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
  maxPower: IMaxPower,
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

export const usePrepareData = (devices: IDevice[], rates: IRate[], maxPower: IMaxPower, isFetching: boolean) => {
  let result: Result = {};

  if (isFetching) {
    return result;
  }

  devices.forEach((device) => {
    result = distributionOfDevicesOverTime(device, rates, maxPower, result);
  });
  return result;
};
