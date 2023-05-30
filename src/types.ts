export interface IDevice {
  id: string;
  name: string;
  power: number;
  duration: number;
  mode?: TMode;
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

export type TMode = 'day' | 'night';
