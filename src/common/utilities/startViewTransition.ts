export const startViewTransition = async (callback: () => void, finished = () => {}) => {
  if (
    'startViewTransition' in document && typeof document.startViewTransition === 'function'
  ) {
    const transition = document.startViewTransition(callback);
    try {
      await transition.finished;
    } finally {
      finished();
    }
  } else {
    callback();
    finished();
  }
};
