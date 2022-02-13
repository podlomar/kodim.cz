import { ResourceRef } from 'kodim-cms/esm/content/resource';
import clsx from 'clsx';
import { Lock } from '../icons';
import './style.scss';

interface Props {
  className?: string,
  entryRef: ResourceRef<any>;
  text: string;
}

const EntryLink = ({ className, entryRef, text }: Props) => {
  if (entryRef.status === 'forbidden') {
    return (
      <span className={clsx('entry-link', 'entry-link--locked', className)}>
        <Lock color="white" />
        <span className="entry-link__text">{text}</span>
      </span>
    );
  }

  return (
    <a className={clsx('entry-link', className)} href={entryRef.path}>
      {text}
    </a>
  );
};

export default EntryLink;
