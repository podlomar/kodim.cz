'use client';

import { Group, User } from 'lib/directus';
import { addToGroupAction, InviteState } from './action';
import Alert from '../Alert';
import { useActionState } from 'react';
import Button from '../Button';
import Form from '../Form';

interface Props {
  group: Group,
  user: User | null,
}

const Invitation = ({ group, user }: Props) => {
  if (group.invite === 'closed') {
    return (
      <p>Pozvánky do skupiny <strong>{group.name}</strong> jsou v tuto chvíli uzavřeny.</p>
    );
  }

  if (user === null) {
    return (
      <p>
        Pro vstup do skupiny <strong>{group.name}</strong> se nejprve musíte <a href={`/prihlasit?returnUrl=${window.location.pathname}`}>přihlásit</a>.
      </p>
    );
  }

  const isInGroup = user.groups.some((g) => g.id === group.id);
  if (isInGroup) {
    return (
      <>
        <p>Již jste členem skupiny <strong>{group.name}</strong>.</p>
        <p><a href="/profil">Přejít na profil</a></p>
      </>
    );
  }

  const addAction = addToGroupAction.bind(null, user.id, group.id);
  const [inviteState, formAction, pending] = useActionState<InviteState, FormData>(
    addAction, 'ready',
  );

  if (inviteState === 'success') {
    return (
      <p>Byli jste úspěšně přidáni do skupiny <strong>{group.name}</strong>.</p>
    );
  }

  if (inviteState === 'error') {
    return (
      <Alert type="warning" title="Neznámá chyba při přidávání do skupiny" />
    );
  }

  return (
    <>
      <p>Jste zváni do skupiny <strong>{group.name}</strong></p>
      <Form action={formAction}>
        <Form.Controls>
          <Button type="submit" disabled={pending}>
            Přijmout pozvánku
          </Button>
        </Form.Controls>
      </Form>
    </>
  );
};

export default Invitation;
