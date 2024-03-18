import React from 'react';
import Icon, { IconName } from '../Icon';
import styles from './styles.module.scss';

interface Props {
  icon: IconName;
  children: React.ReactNode;
}

const InfoBox = ({ icon, children}: Props): JSX.Element => {
  return (
    <div className={styles.infoBox}>
      <Icon className={styles.infoIcon} name={icon} size="4rem" />
      <div>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
