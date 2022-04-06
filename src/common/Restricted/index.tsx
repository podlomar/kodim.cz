import { ReactNode } from 'react';
import { Account, ServerAppContext, useData } from '../AppContext';
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
    (context: ServerAppContext) => hasClaim(context.account, claim),
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return allowed ? <>{children}</> : null;
};

export default Restricted;
