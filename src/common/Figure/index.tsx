import clsx from 'clsx';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useOnEscapeKey } from '../utilities/useOnEscapeKey';
import './styles.scss';

interface Props {
  src: string
  alt: string
  size?: number
}

const Figure = ({ src, alt, size }: Props) => {
  const previewRef = useRef<HTMLImageElement>(null);
  const fullscreenRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnEscapeKey(isOpen ? close : null);

  useEffect(() => {
    const preview = previewRef.current;
    const fullscreen = fullscreenRef.current;
    if (!preview || !fullscreen) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const previewRect = preview.getBoundingClientRect();
    const fullscreenRect = fullscreen.getBoundingClientRect();

    const previewScale = previewRect.width / fullscreenRect.width;
    const previewOffsetX = previewRect.left
      + previewRect.width / 2
      - (fullscreenRect.left + fullscreenRect.width / 2);
    const previewOffsetY = previewRect.top
      + previewRect.height / 2
      - (fullscreenRect.top + fullscreenRect.height / 2);

    const animationSteps: Keyframe[] = [
      {
        transform: `translate(${previewOffsetX}px, ${previewOffsetY}px) scale(${previewScale})`,
      },
      { transform: 'none' },
    ];

    const duration = 200; // Same in CSS

    const animation = fullscreen.animate(
      isOpen ? animationSteps : animationSteps.reverse(),
      duration,
    );
    // eslint-disable-next-line consistent-return
    return () => {
      animation.cancel();
    };
  }, [isOpen]);

  return (
    <div className={clsx('figure', isOpen && 'figure--is-open')}>
      <button
        type="button"
        className="figure__preview"
        onClick={open}
        aria-label="zvětšit obrázek"
      >
        <img
          style={size ? { width: `${size}%` } : undefined}
          src={src}
          alt={alt}
          className="figure__preview-image"
          ref={previewRef}
        />
      </button>
      <button
        type="button"
        className="figure__fullscreen"
        onClick={close}
        aria-label="zavřít obrázek"
      >
        <img
          src={src}
          alt={alt}
          className="figure__fullscreen-image"
          ref={fullscreenRef}
        />
      </button>
    </div>
  );
};

export default Figure;
