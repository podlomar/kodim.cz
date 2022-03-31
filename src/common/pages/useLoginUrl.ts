import { useAppContext } from '../AppContext/index';

const useLoginUrl = () => {
  const { url: returnUrl } = useAppContext();
  const baseUrl = '/prihlasit';

  if (returnUrl.startsWith(baseUrl)) {
    return returnUrl;
  }
  return `${baseUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
};

export default useLoginUrl;
