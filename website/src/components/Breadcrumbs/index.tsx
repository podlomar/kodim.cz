import Link from 'next/link';
import { Crumbs } from 'kodim-cms/esm/content/crumbs.js';
import styles from './styles.module.scss';
import { Fragment } from 'react';

interface Props {
  crumbs: Crumbs,
}

const Breadcrumbs = ({ crumbs }: Props) => {
  return (
    <div className={styles.breadcrumbs}>
      {
        crumbs.map(({ path, title }) => (
          <Fragment key={path}>
            {' /'}
            &nbsp;
            <Link href={path} key={path}>{title}</Link>
          </Fragment>
        ))
      }
    </div>
  );
};

export default Breadcrumbs;
