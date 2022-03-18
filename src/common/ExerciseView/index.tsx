import { Jsml } from 'kodim-cms/esm/jsml';
import JsmlContainer from '../JsmlContainer';
import Num from '../Num';
import './styles.scss';

interface Props {
  num: number,
  title: string,
  link: string,
  path: string,
  demand: number,
  offerSolution: boolean,
  jsml: Jsml,
}

const demandText = [
  null,
  'pohodička',
  'to dáš',
  'zapni hlavu',
  'zavařovačka',
  'smrt v přímém přenosu',
] as const;

const ExerciseView = ({
  num, title, link, demand, offerSolution, path, jsml,
}: Props) => {
  return (
    <div id={link} className="exercise-assign">
      <Num className="exercise-assign__num" value={num} />
      <div className="exercise-assign__head">
        <h3 className="exercise-assign__title">
          <a href={`#${link}`} className="exercise-assign__title-anchor">
            {title}
          </a>
        </h3>
        <div className="exercise-assign__demand">
          <div className={`demand demand--${demand}`} />
          <div className="demand-text">{demandText[demand]}</div>
        </div>
      </div>
      <div className="exercise-assign__body">
        <JsmlContainer jsml={jsml} />
      </div>
      {offerSolution ? (
        <div className="exercise-assign__controls">
          {path === 'forbidden'
            ? (
              <span className="entry-link entry-link--locked btn">
                <i className="icon-lock" />
                <span>Řešení</span>
              </span>
            ) : (
              <a className="entry-link btn" href={path}>Řešení</a>
            )}
        </div>
      ) : null}
    </div>
  );
};

export default ExerciseView;
