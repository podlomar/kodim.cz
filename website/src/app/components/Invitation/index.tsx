'use client';

import { Group, User, addToGroup } from 'lib/directus';
import { addToGroupAction } from 'app/actions';
import styles from './styles.module.scss';
import SubmitButton from '../SubmitButton';

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
        Pro vstup do skupiny <strong>{group.name}</strong> se nejprve musíte <a href={`/prihlasit?returnUrl=/pozvanky/${group.id}`}>přihlásit</a>.
      </p>
    );
  }

  const isInGroup = user.groups.some((g) => g.id === group.id);
  if (isInGroup) {
    return (
      <>
        <p>Jste členem skupiny <strong>{group.name}</strong>.</p>
        <p><a href="/profil">Přejít na profil</a></p>
      </>
    );
  }
  
  const addAction = addToGroupAction.bind(null, user.id, group.id);
      
  return (
    <>
      <p>Jste zváni do skupiny <strong>{group.name}</strong></p>
      <form action={addAction} className={styles.form}>
        <SubmitButton label="Přijmout pozvánku" />
      </form>
    </>
  );
};

export default Invitation;
