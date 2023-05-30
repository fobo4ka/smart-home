import React from 'react';

import { Wrapper, Text } from './styles';
import { useCountCost } from '../../../../hooks';
import { IDevice, IMaxPower, IRate } from "../../../../types";

interface CostsProps {
  devices: IDevice[];
  rates: IRate[];
  maxPower: IMaxPower['value'];
  isFetching: boolean;
}

export const Cost: React.FC<CostsProps> = ({ devices, rates, maxPower,
                                             isFetching }) => {
  const cost = useCountCost(devices, rates, maxPower, isFetching);

  if (isFetching) {
    return null;
  }

  return (
    <Wrapper>
      <Text>Стоимость электроэнергии: {cost} рябчиков</Text>
    </Wrapper>
  );
};
