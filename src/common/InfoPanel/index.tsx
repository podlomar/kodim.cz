import { ReactNode } from 'react';
import './styles.scss';

interface Props {
  heading: string,
  footer?: ReactNode,
  children: ReactNode,
}

const InfoPanel = ({ heading, footer, children }: Props) => {
  return (
    <div className="info-panel">
      <h2 className="info-panel__heading">{heading}</h2>
      <div className="info-panel__body">{children}</div>
      {footer === undefined ? null : <div className="info-panel__footer">{footer}</div>}
    </div>
  );
};

export default InfoPanel;
