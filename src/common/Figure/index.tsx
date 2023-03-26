import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useOnEscapeKey } from '../utilities/useOnEscapeKey';
import './styles.scss';

interface Props {
  src: string
  alt: string
  size?: number
}

const Figure = ({ src, alt, size }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnEscapeKey(isOpen ? close : null);

  return (
    <div className={clsx('figure', isOpen && 'figure--is-open')}>
      <button type="button" className="figure__preview" onClick={open} aria-label="zvětšit obrázet">
        <img
          style={size ? { width: `${size}%` } : undefined}
          src={src}
          alt={alt}
          className="figure__preview-image"
        />
      </button>
      <button type="button" className="figure__fullscreen" onClick={close} aria-label="zavřít obrázek">
        <img src={src} alt={alt} className="figure__fullscreen-image" />
      </button>
    </div>
  );
};

export default Figure;
