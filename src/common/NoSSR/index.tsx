import { ReactNode } from 'react';
import { useAppContext } from '../AppContext';

interface Props {
  children: ReactNode,
}

const NoSSR = ({ children }: Props) => {
  const { env } = useAppContext();

  if (env === 'server') {
    return null;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{ children }</>;
};

export default NoSSR;
