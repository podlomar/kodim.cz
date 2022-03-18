import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode,
}

const NoSSR = ({ children }: Props) => {
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setFirst(false);
  }, []);

  if (first) {
    return null;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{ children }</>;
};

export default NoSSR;
