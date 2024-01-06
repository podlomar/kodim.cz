import MainLayout from 'components/MainLayout';
import { fetchGroup } from '../../../lib/directus';
import { notFound } from 'next/navigation';
import Panel from 'components/Panel';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    groupId: string;
  }
}

const InvitePage = async ({ params }: Props): Promise<JSX.Element> => {
  const group = await fetchGroup(params.groupId);
  if (group === null) {
    notFound();
  }

  if (group.invite === 'none') {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Pozvánka do skupiny">
          <p>Jste zváni do skupiny: <strong>{group.name}</strong></p>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default InvitePage;
