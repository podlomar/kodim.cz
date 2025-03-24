import { type JSX } from "react";
import { redirect } from 'next/navigation';
import { session } from 'app/session';
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';
import css from './styles.module.scss';
import RegistrationForm from "app/components/RegistrationForm";

export const dynamic = 'force-dynamic';

const RegisterPage = async (): Promise<JSX.Element> => {
  const { user } = await session();

  if (user !== null) {
    redirect('/');
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Registrace">
          <RegistrationForm />
        </Panel>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
