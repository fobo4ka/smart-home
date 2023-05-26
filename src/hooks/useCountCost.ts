import { useMemo } from 'react';
import { usePrepareData } from './index';
import { type IDevice, type IMaxPower, type IRate } from '../types';

export const useCountCost = (devices: IDevice[], rates: IRate[], maxPower: IMaxPower, isFetching: boolean) => {
  const data = usePrepareData(devices, rates, maxPower, isFetching);


  return useMemo(
    () =>
      Object.values(data)
        .reduce((sum, item) => (sum += item.cost), 0)
        .toLocaleString('ru'),
    [data]
  );
};
