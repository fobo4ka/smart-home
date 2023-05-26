import { useMemo } from 'react';
import { type QueriesOptions, useMutation, useQueries, useQuery } from 'react-query';

import { getDevices, getMaxPower, getRates, postNewDevice } from '../api';
import { type IDevice, type IMaxPower, type IRate } from '../types';

const KEYS = {
  getDevices: ['getDevices'],
  getRates: ['getRates'],
  getMaxPower: ['getMaxPower'],
};

export const useDevices = (): IDevice[] => {
  const query = useQuery(KEYS.getDevices, async () => await getDevices(), {
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return useMemo(() => query.data?.sort((item, nextItem) => nextItem.power - item.power), [query.data]);
};

export const useRates = (): IRate[] => {
  const query = useQuery(KEYS.getRates, async () => await getRates(), {
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return useMemo(() => query.data?.sort((item, nextItem) => item.value - nextItem.value), [query.data]);
};

export const useMaxPower = (): IMaxPower => {
  const query = useQuery(KEYS.getMaxPower, async () => await getMaxPower(), {
    refetchOnWindowFocus: false,
    initialData: {
      value: 0,
    },
  });
  return useMemo(() => query.data, [query.data]) as IMaxPower;
};

export const useData = () => {
  const results = useQueries<
    [devices: QueriesOptions<IDevice[]>, rates: QueriesOptions<IRate[]>, maxPower: QueriesOptions<IMaxPower>]
  >([
    {
      queryKey: [KEYS.getDevices],
      queryFn: async () => await getDevices(),
    },
    {
      queryKey: [KEYS.getRates],
      queryFn: async () => await getRates(),
    },
    {
      queryKey: [KEYS.getMaxPower],
      queryFn: async () => await getMaxPower(),
    },
  ]);

  console.trace();

  const [devicesQuery, ratesQuery, maxPowerQuery] = results;
  const devices = devicesQuery.data?.sort((item, nextItem) => nextItem.power - item.power);
  const rates = ratesQuery.data?.sort((item, nextItem) => item.value - nextItem.value);
  const maxPower = maxPowerQuery.data?.value;
  const isFetching = Boolean(devicesQuery.isFetching || ratesQuery.isFetching || maxPowerQuery.isFetching);

  return useMemo(() => {
    return [devices, rates, maxPower, isFetching];
  }, [devices, rates, maxPower, isFetching]);
};
export const useAddDevice = (queryClient) =>
  useMutation({
    mutationFn: postNewDevice,
    onSuccess: () => {
      console.log('Устройство добавлено');
      queryClient.invalidateQueries([KEYS.getDevices]);
    },
  });
