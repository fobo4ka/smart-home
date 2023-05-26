import React from 'react';

import { Chart } from './components/Chart';
import { Cost } from './components/Cost';
import { AddNewDevice } from './components/AddNewDevice';

import { Wrapper } from './styles';

export const Main = () => {

    return (
      <Wrapper>
        <h1>График работы устройств</h1>
        <Chart />
        <Cost />
        <AddNewDevice />
      </Wrapper>
    )
};
