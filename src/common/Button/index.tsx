import { ReactNode, useMemo } from 'react';
import './style.scss';

interface Props {
  href?: string
  icon?: ReactNode
  children: ReactNode
}

const Button = ({ children, href, icon }: Props) => {
  const baseClassName = 'btn';

  const content = useMemo(() => (
    <>
      {icon && (
      <span className="btn__icon">
        {icon}
      </span>
      )}
      {children}
    </>
  ), [children, icon]);

  if (href === undefined) {
    return <span className={baseClassName}>{content}</span>;
  }

  return <a href={href} className={baseClassName}>{content}</a>;
};

export default Button;
