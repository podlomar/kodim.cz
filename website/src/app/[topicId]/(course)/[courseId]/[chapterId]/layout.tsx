import type { JSX } from "react";
import MainLayout from 'app/components/MainLayout';

export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props): Promise<JSX.Element> => {
  return <MainLayout showBrand>{children}</MainLayout>;
};

export default Layout;
