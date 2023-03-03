import clsx from 'clsx';
import { MouseEvent, ReactNode } from 'react';
import './style.scss';

interface Props {
  href?: string
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void
  icon?: ReactNode
  size?: 'small' | 'medium'
  children: ReactNode
}

const Button = ({
  children, href, icon, size = 'medium', onClick,
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

  if (href !== undefined) {
    return <a href={href} onClick={onClick} className={baseClassName}>{content}</a>;
  }

  if (onClick !== undefined) {
    return <button type="button" onClick={onClick} className={baseClassName}>{content}</button>;
  }

  return <span className={baseClassName}>{content}</span>;
};

export default Button;
