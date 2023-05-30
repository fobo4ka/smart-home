import { useMemo } from 'react';
import { useMutation, useQueries, useQuery, QueryClient } from 'react-query';

import { getDevices, getMaxPower, getRates, postNewDevice } from '../api';
import { type IDevice, type IMaxPower, type IRate } from '../types';

const KEYS = {
  getDevices: [ 'getDevices' ],
  getRates: [ 'getRates' ],
  getMaxPower: [ 'getMaxPower' ],
};

export const useDevices = (): IDevice[] => {
  const query = useQuery<IDevice[]>(KEYS.getDevices, async () => await getDevices(), {
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return useMemo(() => {
    if (query?.data?.length) {
      return query.data.sort((item, nextItem) => nextItem.power - item.power);
    }
  return [];
  }, [ query.data ])
};

export const useRates = (): IRate[] | undefined => {
  const query = useQuery(KEYS.getRates, async () => await getRates(), {
    refetchOnWindowFocus: false,
    initialData: [],
  });
  return useMemo(() => {
    if (query?.data?.length) {
      return query.data.sort((item, nextItem) => item.value - nextItem.value);
    }
    return [];
  }, [ query.data ])
};

export const useMaxPower = (): IMaxPower => {
  const query = useQuery(KEYS.getMaxPower, async () => await getMaxPower(), {
    refetchOnWindowFocus: false,
    initialData: {
      value: 0,
    },
  });
  return useMemo(() => query.data, [ query.data ]) as IMaxPower;
};

export const useData = (): [devices: IDevice[], rates: IRate[], maxPower: IMaxPower['value'], isFetching: boolean] => {
  const results = useQueries([
    {
      queryKey: [ KEYS.getDevices ],
      queryFn: async () => await getDevices(),
    },
    {
      queryKey: [ KEYS.getRates ],
      queryFn: async () => await getRates(),
    },
    {
      queryKey: [ KEYS.getMaxPower ],
      queryFn: async () => await getMaxPower(),
    },
  ]);

  return useMemo(() => {
    const [ devicesQuery, ratesQuery, maxPowerQuery ] = results;

    const devices = devicesQuery?.data?.sort((item: IDevice, nextItem: IDevice) => nextItem.power - item.power) || [];
    const rates = ratesQuery.data?.sort((item: IRate, nextItem: IRate) => item.value - nextItem.value) || [];
    const maxPower = maxPowerQuery.data?.value || 0;
    const isFetching = Boolean(devicesQuery.isFetching || ratesQuery.isFetching || maxPowerQuery.isFetching);

    return [ devices, rates, maxPower, isFetching ];
  }, [ results ]);
};

export const useAddDevice = (queryClient: QueryClient) =>
  useMutation<unknown, (data: IDevice) => Promise<IDevice>, IDevice>({
    mutationFn: postNewDevice,
    onSuccess: () => {
      queryClient.invalidateQueries([ KEYS.getDevices ]).then((r) => console.log('Устройство добавлено'));
    },
    onError: () => console.log('Ошибка. Устройство не добавлено'),
  });
