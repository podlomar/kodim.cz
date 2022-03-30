import { useAppContext } from '../AppContext/index';

const useLoginUrl = () => {
  const { url } = useAppContext();
  const baseUrl = '/prihlasit';

  if (url.startsWith(baseUrl)) {
    return url;
  }
  return `${baseUrl}?returnUrl=${encodeURIComponent(url)}`;
};

export default useLoginUrl;
