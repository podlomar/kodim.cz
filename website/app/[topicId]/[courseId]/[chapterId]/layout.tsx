import clsx from 'clsx';
import Brand from 'components/Brand';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: Props): Promise<JSX.Element> => {
  return (
    <>
      <header className={clsx(styles.header, 'container')}>
        <Brand size="small" /> 
      </header>
      {children}
    </>
  );
};

export default MainLayout;
