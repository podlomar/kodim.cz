import clsx from 'clsx';
import { useCallback, useState } from 'react';
import './styles.scss';

interface Props {
  src: string,
  alt: string,
  size?: number,
}

const Figure = ({ src, alt, size }: Props) => {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const open = useCallback(() => { setIsFullOpen(true); }, []);
  const close = useCallback(() => { setIsFullOpen(false); }, []);

  return (
    <>
      <button type="button" className="figure" onClick={open}>
        <img
          style={size ? { width: `${size}%` } : undefined}
          src={src}
          alt={alt}
          className="figure__preview"
        />
      </button>
      <button type="button" className={clsx('figure__fullscreen', isFullOpen && 'figure__fullscreen--open')} onClick={close}>
        <img
          src={src}
          alt={alt}
          className="figure__full"
        />
      </button>
    </>
  );
};

export default Figure;
