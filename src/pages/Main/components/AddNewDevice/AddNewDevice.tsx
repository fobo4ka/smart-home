import React, { useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useAddDevice } from '../../../../hooks';

import { Modal } from '../../../../common/components/Modal';
import { Button } from '../../../../common/components/Button';
import { Select } from '../../../../common/components/Select';
import { Input } from '../../../../common/components/Input';

import { type IDevice, TMode, IMaxPower } from '../../../../types';

import { Field, Content } from './styles';
import { HOURS_COUNT } from "../../../../constants";

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

interface AddNewDevicesProps {
  maxPower: IMaxPower['value'];
}

export const AddNewDevice: React.FC<AddNewDevicesProps> = ({ maxPower }) => {
  const queryClient = useQueryClient();

  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ name, setName ] = useState<string>('');
  const [ power, setPower ] = useState<number>(1);
  const [ duration, setDuration ] = useState<number>(1);
  const [ mode, setMode ] = useState<TMode | 'placeholder'>('placeholder');
  const [ isValidName, setIsValidName ] = useState<boolean>(true);
  const [ isValidPower, setIsValidPower ] = useState<boolean>(true);
  const [ isValidDuration, setIsValidDuration ] = useState<boolean>(true);

  const { mutate: addNewDevice } = useAddDevice(queryClient);

  const onChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target?.value);
  }, []);

  const onFocusName = useCallback((): void => {
    setIsValidName(true);
  }, []);

  const checkIsValidName = (): void => {
    setIsValidName(name !== '');
  };

  const onChangePower = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setPower(parseInt(event.target?.value));
  }, []);

  const onFocusPower = useCallback((): void => {
    setIsValidPower(true);
  }, []);

  const checkIsValidPower = (): void => {
    setIsValidPower(power > 0 && power <= maxPower);
  };

  const onChangeDuration = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setDuration(parseInt(event.target.value));
  }, []);

  const onFocusDuration = useCallback((): void => {
    setIsValidDuration(true);
  }, []);

  const checkIsValidDuration = (): void => {
    setIsValidDuration(duration > 0 && duration < HOURS_COUNT);
  };

  const onChangeMode = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
    setMode(event.target?.value as TMode);
  }, []);

  const clickHandler = (): void => {
    checkIsValidName();
    checkIsValidPower();
    checkIsValidDuration();

    if (name !== '' && duration > 0 && power > 0) {
      const newDevice: IDevice = {
        name,
        duration,
        power,
        id: Date.now().toString(),
        mode: mode !== 'placeholder' ? mode : undefined,
      };

      addNewDevice(newDevice);
      setShowModal(false);
      setName('');
      setDuration(1);
      setPower(1);
      setMode('placeholder');
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        color="red">
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
              name="name"
              label="Название"
              type="text"
              value={name}
              onChange={onChangeName}
              onFocus={onFocusName}
              isValid={isValidName}
              validationMessage="Введите название устройства"
            />
          </Field>
          <Field>
            <Input
              name="power"
              label="Потребляемая мощность"
              type="number"
              min={1}
              value={power}
              onChange={onChangePower}
              onFocus={onFocusPower}
              isValid={isValidPower}
              validationMessage={`Введите потребляемую мощность, она должна быть небольше ${maxPower}`}
            />
          </Field>
          <Field>
            <Input
              name="duration"
              label="Длительность работы (часы)"
              type="number"
              min={1}
              value={duration}
              onChange={onChangeDuration}
              onFocus={onFocusDuration}
              isValid={isValidDuration}
              validationMessage="Введите длительность работы устройства"
            />
          </Field>
          <Field>
            <Select name="mode" label="Выберите режим работы" options={MODES} value={mode} onChange={onChangeMode} />
          </Field>
          <Button onClick={clickHandler} color="red">
            Добавить
          </Button>
        </Content>
      </Modal>
    </>
  );
};
