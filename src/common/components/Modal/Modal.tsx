import React from 'react';

import { Cross } from '../../icons';
import { useOnClickOutside } from '../../../hooks';
import { Portal } from '../Portal';

import { Overlay, Content, CloseButton } from './styles';

export interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ showModal, onClose, children }) => {
  const modalRef = React.useRef<null | HTMLDivElement>(null);

  useOnClickOutside(modalRef, (e: { target: HTMLElement }) => {
    if ((e.target as HTMLElement).contains(modalRef.current)) {
      showModal && onClose();
    }
  });

  return (
    <>
      {showModal && (
        <Portal>
          <Overlay>
            <Content ref={modalRef}>
              <CloseButton onClick={onClose}>
                <Cross />
              </CloseButton>
              {children}
            </Content>
          </Overlay>
        </Portal>
      )}
    </>
  );
};
