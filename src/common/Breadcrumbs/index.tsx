import { Crumbs } from 'kodim-cms/esm/content/resource';
import './styles.scss';

interface Props {
  steps: Crumbs,
}

const Breadcrumbs = ({ steps }: Props) => {
  return (
    <nav className="breadcrumbs">
      <ol className="breadcrumbs__list">
        {steps.map((step) => (
          <li key={step.path} className="breadcrumbs__item">
            <a className="breadcrumbs__link" href={step.path}>{step.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
