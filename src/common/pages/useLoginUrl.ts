import { useAppContext } from '../AppContext/index';

const useLoginUrl = () => {
  const { url } = useAppContext();
  const baseUrl = '/prihlasit';

  if (url.startsWith(baseUrl)) {
    return baseUrl;
  }
  return `${baseUrl}?return=${encodeURIComponent(url)}`;
};

export default useLoginUrl;
