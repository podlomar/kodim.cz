import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import { startViewTransition } from '../utilities/startViewTransition';
import { useOnEscapeKey } from '../utilities/useOnEscapeKey';
import './styles.scss';

interface Props {
  src: string
  alt: string
  size?: number
}

const Figure = ({ src, alt, size }: Props) => {
  const [state, setState] = useState<'preview' | 'beforeChange' | 'open'>('preview');
  const open = useCallback(() => {
    if (state !== 'preview') {
      return;
    }
    flushSync(() => {
      setState('beforeChange');
    });
    startViewTransition(() => {
      setState('open');
    });
  }, [state]);
  const close = useCallback(() => {
    if (state !== 'open') {
      return;
    }
    startViewTransition(() => {
      setState('beforeChange');
    }, () => {
      setState('preview');
    });
  }, [state]);

  useOnEscapeKey(close);

  return (
    <div className={clsx('figure', `figure--${state}`)}>
      <button type="button" className="figure__preview" onClick={open}>
        <img
          style={size ? { width: `${size}%` } : undefined}
          src={src}
          alt={alt}
          className="figure__preview-image"
        />
      </button>
      {state === 'open' && (
        <button type="button" className="figure__fullscreen" onClick={close}>
          <img src={src} alt={alt} className="figure__fullscreen-image" />
        </button>
      )}
    </div>
  );
};

export default Figure;
