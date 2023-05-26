export interface IDevice {
  id: string;
  name: string;
  power: number;
  duration: number;
  mode?: 'day' | 'night';
}

export interface IRate {
  from: number;
  to: number;
  value: number;
}

export interface IMaxPower {
  value: number;
}

export type Hour = '1' | '2' | '3' | '4';
