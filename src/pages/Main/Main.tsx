import React from 'react';

import { Chart } from './components/Chart';
import { Cost } from './components/Cost';
import { AddNewDevice } from './components/AddNewDevice';
import { useData } from '../../hooks';

import { Wrapper } from './styles';

export const Main = () => {
    const [ devices, rates, maxPower, isFetching ] = useData();

  return (
    <Wrapper>

      <h1>График работы устройств</h1>

      <Chart
          devices={devices}
          rates={rates}
          maxPower={maxPower}
          isFetching={isFetching}
      />

      <Cost
          devices={devices}
          rates={rates}
          maxPower={maxPower}
          isFetching={isFetching}
      />

      <AddNewDevice maxPower={maxPower} />

    </Wrapper>
  );
};
