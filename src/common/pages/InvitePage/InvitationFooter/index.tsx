import { useParams } from 'react-router';
import Button from '../../../Button';
import type { Invitation } from '../InvitationMessage';

interface Props {
  invitation: Invitation;
}

const InvitationFooter = ({ invitation }: Props): JSX.Element => {
  const { status } = invitation;
  const { inviteToken } = useParams();
  const invitePath = `/pozvanky/skupina/${inviteToken}`;

  if (status === 'no-login') {
    return (
      <Button href={`/prihlasit?returnUrl=${invitePath}`}>Přihlásit</Button>
    );
  }

  if (status === 'invite') {
    return (
      <form action={`${invitePath}/vstoupit`} method="post">
        <button className="btn" type="submit">Vstoupit do skupiny</button>
      </form>
    );
  }

  if (status === 'already-joined') {
    return (
      <form action={`${invitePath}/opustit`} method="post">
        <button className="btn" type="submit">Opustit skupinu</button>
      </form>
    );
  }

  return (
    <Button href="/">Zpět na hlavní stránku</Button>
  );
};

export default InvitationFooter;
