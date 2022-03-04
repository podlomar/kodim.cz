import { ReactNode } from 'react';
import './styles.scss';

interface Props {
  type: 'error';
  title: string,
  children: ReactNode,
}

const ContentAlert = ({ type, title, children }: Props) => {
  return (
    <div className={`content-alert content-alert--${type}`}>
      <div className="content-alert__head">
        <strong>
          CHYBA:&nbsp;
          {title}
        </strong>

      </div>
      <div className="content-alert__body">
        { children }
      </div>
    </div>
  );
};

export default ContentAlert;
