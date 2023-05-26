import { type IDevice, type IMaxPower, type IRate } from '../types';

const BASE_URL = 'http://localhost:4000';

async function handleResponse(response: Response): Promise<unknown | Error> {
  if (response.ok) {
    return await response.json();
  }
}

export const getDevices = async (): Promise<IDevice[]> => {
  return await fetch(`${BASE_URL}/devices`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then<IDevice[]>(handleResponse);
};

export const getRates = async (): Promise<IRate[]> => {
  return await fetch(`${BASE_URL}/rates`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then<IRate[]>(handleResponse);
};

export const getMaxPower = async (): Promise<IMaxPower> => {
  return await fetch(`${BASE_URL}/maxPower`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then<IMaxPower>(handleResponse);
};

export const postNewDevice = async (data: IDevice): Promise<IDevice> => {
  return await fetch(`${BASE_URL}/devices`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then<IDevice>(handleResponse);
};
