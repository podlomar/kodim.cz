export interface Invitation {
  status: (
    | 'invite'
    | 'already-joined'
    | 'joined'
    | 'already-left'
    | 'left'
    | 'no-login'
    | 'no-group'
  ),
  groupTitle: string,
}

interface Props {
  invitation: Invitation;
}

const InvitationMessage = ({ invitation }: Props): JSX.Element => {
  const { status, groupTitle } = invitation;

  if (status === 'no-login') {
    return (
      <p>Pro vstup nebo opuštění skupiny musíte být přihlášeni.</p>
    );
  }

  if (status === 'no-group') {
    return (
      <p>Tato pozvánka je neplatná.</p>
    );
  }

  if (status === 'invite') {
    return (
      <p>
        Jste zváni ke vstupu do skupiny
        {' '}
        <strong>{groupTitle}</strong>
        .
      </p>
    );
  }

  if (status === 'already-joined') {
    return (
      <p>
        Již jste členem skupiny
        {' '}
        <strong>{groupTitle}</strong>
        .
      </p>
    );
  }

  if (status === 'already-left') {
    return (
      <p>
        Skupinu
        {' '}
        <strong>{groupTitle}</strong>
        {' '}
        jste již opustili.
      </p>
    );
  }

  if (status === 'joined') {
    return (
      <p>
        Byli jste úspešně přidáni do skupiny
        {' '}
        <strong>{groupTitle}</strong>
        .
      </p>
    );
  }

  return (
    <p>
      Opustili jste skupinu
      {' '}
      <strong>{groupTitle}</strong>
      .
    </p>
  );
};

export default InvitationMessage;
