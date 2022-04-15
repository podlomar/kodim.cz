import Button from '../Button';
import Pencil from '../icons/Pencil';

export interface EditPageButtonProps {
  path: string
  mode: 'edit' | 'tree' | 'blob'
}

const EditPageButton = ({ path, mode }: EditPageButtonProps) => {
  // @TODO: get branch and repositoryBaseUrl from kodim-cms
  const branch = 'master';
  const repositoryBaseUrl = 'https://github.com/Czechitas-podklady-WEB/daweb-vyuka';

  return (
    <Button icon={<Pencil />} href={`${repositoryBaseUrl}/${mode}/${branch}/${path}`}>
      Upravit tuto stránku na GitHubu
    </Button>
  );
};

export default EditPageButton;
