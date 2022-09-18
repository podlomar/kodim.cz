import ErrorReport from '../../ErrorLayout';

const NotFoundPage = () => {
  return (
    <ErrorReport title="Stránka nenalezena" status={404} />
  );
};

export default NotFoundPage;
