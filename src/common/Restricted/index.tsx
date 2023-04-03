import { ReactNode } from 'react';
import { ServerContextValue, useData } from '../AppContext';
import type { Account } from '../../server/authController';

import './style.scss';

interface Props {
  claim: string;
  children: ReactNode;
}

const hasClaim = (
  account: Account | null,
  claim: string,
): boolean => (account === null
  ? false
  : account.claims.web.includes(claim));

const Restricted = ({ claim, children }: Props): JSX.Element | null => {
  const allowed = useData(
    (context: ServerContextValue) => hasClaim(context.account, claim),
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return allowed ? <>{children}</> : null;
};

export default Restricted;
