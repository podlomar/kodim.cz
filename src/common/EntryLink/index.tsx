import clsx from 'clsx';
import { Lock } from '../icons';
import './style.scss';

interface Props {
  className?: string,
  path: string,
  text: string,
  forbidden: boolean,
}

const EntryLink = ({
  className, path, text, forbidden,
}: Props) => {
  if (forbidden) {
    return (
      <span className={clsx('entry-link', 'entry-link--locked', className)}>
        <Lock color="white" />
        <span className="entry-link__text">{text}</span>
      </span>
    );
  }

  return (
    <a className={clsx('entry-link', className)} href={path}>
      {text}
    </a>
  );
};

export default EntryLink;
