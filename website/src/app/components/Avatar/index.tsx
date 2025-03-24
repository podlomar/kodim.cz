import type { JSX } from "react";
import styles from './styles.module.scss';
import { User } from "lib/directus";
import clsx from "clsx";

interface Props {
  user: User;
  size?: 'small' | 'medium';
}

const Avatar = async ({ user, size = 'small' }: Props): Promise<JSX.Element> => {
  return (
    <img
      className={clsx(styles.avatar, styles[size])}
      src={user.avatarUrl ?? '/img/avatar.svg'}
      alt="Avatar"
    />
  );
};

export default Avatar;
