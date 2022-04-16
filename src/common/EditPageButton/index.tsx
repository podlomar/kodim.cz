import { ResourceRepository } from 'kodim-cms/esm/content/resource';
import Button from '../Button';
import Pencil from '../icons/Pencil';

interface Props {
  repo?: ResourceRepository
  // @TODO: extensions should be handled by kodim-cms by default
  extension?: string,
  mode: 'edit' | 'tree' | 'blob'
}

const EditPageButton = ({ repo, extension, mode }: Props) => {
  if (repo === undefined) {
    return <span>No repository</span>;
  }

  const href = `${repo.url}/${mode}/${repo.branch}/${repo.contentPath}${extension ?? ''}`;
  return (
    <Button icon={<Pencil />} href={href}>
      Upravit stránku na GitHubu
    </Button>
  );
};

export default EditPageButton;
