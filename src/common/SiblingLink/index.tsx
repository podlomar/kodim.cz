import clsx from 'clsx';
import { ResourceRef } from 'kodim-cms/esm/content/resource';
import { Lock } from '../icons';
import './style.scss';

interface Props {
  className?: string;
  entryRef: ResourceRef<any>;
  direction: 'forward' | 'backward';
  text: string;
  label: string;
  iconColor: string;
}

const SiblingLink = ({ className, entryRef, direction, text, label, iconColor }: Props) => {
  const lock = entryRef.status === 'forbidden' ? <Lock color={iconColor} /> : null;

  return (
    <div className={
      clsx(
        'slibling-link',
        `sibling-link--${direction}`,
        className,
      )}>
      {direction === 'backward' ? (
        <div className="sibling-link__head">
          <span className="sibling-link__label sibling-link__label--backward">
            «&nbsp;{label}
          </span>
          {lock}
        </div>
      ) : (
        <div className="sibling-link__head">
          {lock}
          <span className="sibling-link__label sibling-link__label--forward">
            {label}&nbsp;»
          </span>
        </div>
      )}
      {entryRef.status === 'forbidden' ? (
        <span className="entry-link entry-link--locked">
          {text}
        </span>
      ) : (
        <a className="entry-link" href={entryRef.path}>
          {text}
        </a>
      )}
    </div>
  );
}

export default SiblingLink;