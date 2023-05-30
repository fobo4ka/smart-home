import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
  const [ el ] = React.useState(document.createElement('div'));

  React.useLayoutEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [ el ]);

  return ReactDOM.createPortal(children, el);
};
