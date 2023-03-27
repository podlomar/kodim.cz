import { useEffect } from 'react';

export const useOnEscapeKey = (callback: null | (() => void)) => {
  useEffect(() => {
    if (callback === null) {
      return;
    }
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };
    window.addEventListener('keydown', listener);
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [callback]);
};
