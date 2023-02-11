import clsx from 'clsx';
import { ReactNode } from 'react';
import './style.scss';

interface Props {
  href?: string
  icon?: ReactNode
  size?: 'small' | 'medium'
  children: ReactNode
}

const Button = ({
  children, href, icon, size = 'medium',
}: Props) => {
  const baseClassName = clsx('btn', `btn--size-${size}`);

  const content = (
    <>
      {icon && (
      <span className="btn__icon">
        {icon}
      </span>
      )}
      {children}
    </>
  );

  if (href === undefined) {
    return <span className={baseClassName}>{content}</span>;
  }

  return <a href={href} className={baseClassName}>{content}</a>;
};

export default Button;
