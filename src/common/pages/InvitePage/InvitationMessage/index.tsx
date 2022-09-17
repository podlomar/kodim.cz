// import Button from '../../Button';

export interface Invitation {
  status: 'already-done' | 'success' | 'no-login' | 'no-group',
  groupTitle: string,
}

interface Props {
  invitation: Invitation;
}

const InvitationMessage = ({ invitation }: Props): JSX.Element => {
  const { status, groupTitle } = invitation;

  if (status === 'no-login') {
    return (
      <p>Pro uplatnění pozvánky musíte být přihlášeni.</p>
    );
  }

  if (status === 'no-group') {
    return (
      <p>Tato pozvánka je neplatná.</p>
    );
  }

  if (status === 'success') {
    return (
      <p>
        Byl jste úspešně přidán/a do skupiny
        {' '}
        <strong>{groupTitle}</strong>
        .
      </p>
    );
  }

  return (
    <p>
      Již jste členem skupiny
      {' '}
      <strong>{groupTitle}</strong>
      .
    </p>
  );
};

export default InvitationMessage;
