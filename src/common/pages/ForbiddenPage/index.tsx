import ErrorLayout from '../../ErrorLayout';

const ForbiddenPage = () => {
  return (
    <ErrorLayout title="Přístup odepřen" note="Chyba 403" />
  );
};

export default ForbiddenPage;
