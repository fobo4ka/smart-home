import React from 'react';
import { useCountCost } from '../../../../hooks';

import { Wrapper, Text } from './styles';
import {useData} from "../../../../hooks";

export const Cost = () => {
    const [devices, rates, maxPower, isFetching] = useData();
    const cost = useCountCost(devices, rates, maxPower, isFetching);

    if (isFetching) {
        return;
    }

  return (
    <Wrapper>
      <Text>Стоимость электроэнергии: {cost} рябчиков</Text>
    </Wrapper>
  );
};
