import { type IDevice, type IMaxPower, type IRate } from '../types';
import axios from "axios";

const BASE_URL = 'http://localhost:4000';

export const getDevices = async (): Promise<IDevice[]> => {
  return await axios
      .get(`${BASE_URL}/devices`)
      .then((response) => response.data);
};

export const getRates = async (): Promise<IRate[]> => {
  return await axios
      .get(`${BASE_URL}/rates`)
      .then((response) => response.data);
};

export const getMaxPower = async (): Promise<IMaxPower> => {
  return await axios
      .get(`${BASE_URL}/maxPower`)
      .then((response) => response.data);
};

export const postNewDevice = async (data: IDevice): Promise<IDevice> => {
  return await axios
      .post(`${BASE_URL}/devices`, data)
      .then((response) => response.data);
};
