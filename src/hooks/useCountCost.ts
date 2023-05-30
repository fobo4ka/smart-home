import { useMemo } from 'react';

import { type IDevice, type IMaxPower, type IRate } from '../types';
import { prepareData } from '../utils/prepareData';

export const useCountCost = (devices: IDevice[], rates: IRate[], maxPower: IMaxPower['value'], isFetching: boolean) => {
  const data = prepareData(devices, rates, maxPower, isFetching);

  return useMemo(
    () =>
      Object.values(data)
        .reduce((sum, item) => (sum += item.cost), 0)
        .toLocaleString('ru'),
    [ data ]
  );
};
