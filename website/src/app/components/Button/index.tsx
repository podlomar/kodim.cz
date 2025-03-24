import type { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  disabled?: boolean;
  children: ReactNode;
}

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
}: Props): JSX.Element => {
  return (
    <button
      type={type}
      className={clsx(styles.btn, styles[variant], styles[size])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
