import MainLayout from 'app/components/MainLayout';
import { fetchGroup } from '../../../lib/directus';
import { notFound } from 'next/navigation';
import Panel from 'app/components/Panel';
import { session } from 'app/session';
import Invitation from 'app/components/Invitation';

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

  const { user } = await session();

  return (
    <MainLayout>
      <div className="container">
        <Panel title="Pozvánka do skupiny">
          <Invitation group={group} user={user} />
        </Panel>
      </div>
    </MainLayout>
  );
};

export default InvitePage;
