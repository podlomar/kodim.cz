export interface EditPageButtonProps {
  path: string
  mode: 'edit' | 'tree' | 'blob'
}

const EditPageButton = ({ path, mode }: EditPageButtonProps) => {
  // @TODO: get branch and repositoryBaseUrl from kodim-cms
  const branch = 'master';
  const repositoryBaseUrl = 'https://github.com/Czechitas-podklady-WEB/daweb-vyuka';

  return (
    <a className="btn" href={`${repositoryBaseUrl}/${mode}/${branch}/${path}`}>Upravit tuto stránku na GitHubu</a>
  );
};

export default EditPageButton;
