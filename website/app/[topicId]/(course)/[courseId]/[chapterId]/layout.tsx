import { Metadata } from 'next';
import MainLayout from 'components/MainLayout';

export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  openGraph: {
    type: 'article',
  }
};

const Layout = async ({ children }: Props): Promise<JSX.Element> => {
  return <MainLayout showBrand>{children}</MainLayout>;
};

export default Layout;
