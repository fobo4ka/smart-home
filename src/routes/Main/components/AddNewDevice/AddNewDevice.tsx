import React, { useState } from 'react';
import { useQueryClient } from "react-query";

import { useAddDevice } from '../../../../hooks';

import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { Select } from '../../../../components/Select';
import { Input } from '../../../../components/Input';

import { type IDevice } from '../../../../types';

import { Field, Content } from './styles';

const MODES = [
  {
    label: 'Дневной',
    value: 'day',
  },
  {
    label: 'Ночной',
    value: 'night',
  },
];

export const AddNewDevice: React.FC = () => {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [power, setPower] = useState<number>(1);
  const [duration, setDuration] = useState<number>(1);
  const [mode, setMode] = useState(null);
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidPower, setIsValidPower] = useState<boolean>(true);
  const [isValidDuration, setIsValidDuration] = useState<boolean>(true);

  const { mutate: addNewDevice } = useAddDevice(queryClient);

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target?.value);
  };

  const onFocusName = (): void => {
    setIsValidName(true);
  };

  const checkIsValidName = (): void => {
    setIsValidName(name !== '');
  };

  const onChangePower = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPower(event.target?.value as number);
  };

  const onFocusPower = (): void => {
    setIsValidPower(true);
  };

  const checkIsValidPower = (): void => {
    setIsValidPower(power > 0);
  };

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDuration(event.target.value as number);
  };

  const onFocusDuration = (): void => {
    setIsValidDuration(true);
  };

  const checkIsValidDuration = (): void => {
    setIsValidDuration(duration > 0);
  };

  const onChangeMode = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setMode(event.target?.value);
  };

  const clickHandler = (): void => {
    checkIsValidName();
    checkIsValidPower();
    checkIsValidDuration();

    const data: IDevice = { ...{ name, duration, power }, id: Date.now().toString() };

    if (mode) {
      data.mode = mode;
    }

    if (name !== '' && duration > 0 && power > 0) {
      addNewDevice(data);
      setShowModal(false);
      setName('');
      setDuration(1);
      setPower(1);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        color='red'>
        Добавить новое устройство
      </Button>
      <Modal
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <Content>
          <h3>Введите данные нового устройства</h3>
          <Field>
            <Input
              name='name'
              label='Название'
              type='text'
              value={name}
              onChange={onChangeName}
              onFocus={onFocusName}
              isValid={isValidName}
              validationMessage='Введите название устройства'
            />
          </Field>
          <Field>
            <Input
              name='power'
              label='Потребляемая мощность'
              type='number'
              min={1}
              value={power}
              onChange={onChangePower}
              onFocus={onFocusPower}
              isValid={isValidPower}
              validationMessage='Введите потребляемую мощность'
            />
          </Field>
          <Field>
            <Input
              name='duration'
              label='Длительность работы (часы)'
              type='number'
              min={1}
              value={duration}
              onChange={onChangeDuration}
              onFocus={onFocusDuration}
              isValid={isValidDuration}
              validationMessage='Введите длительность работы устройства'
            />
          </Field>
          <Field>
            <Select name='mode' label='Выберите режим работы' options={MODES} value={mode} onChange={onChangeMode} />
          </Field>
          <Button onClick={clickHandler} color='red'>
            Добавить
          </Button>
        </Content>
      </Modal>
    </>
  );
};
