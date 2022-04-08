import { useRoutes } from 'react-router';
import Head from '../Head';
import routes from '../pages/routes';
import './style.scss';

export default () => {
  const routesElement = useRoutes(routes);

  return (
    <>
      <Head />
      {routesElement}
    </>
  );
};
