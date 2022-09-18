import ErrorReport from '../../ErrorLayout';

const ForbiddenPage = () => {
  return (
    <ErrorReport title="Přístup odepřen" status={403} />
  );
};

export default ForbiddenPage;
