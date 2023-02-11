import { Jsml } from 'kodim-cms/esm/jsml';
import EntryLink from '../EntryLink';
import JsmlContainer from '../JsmlContainer';
import Num from '../Num';
import './styles.scss';

interface Props {
  num: number,
  title: string,
  link: string,
  path?: string,
  demand: number,
  hasSolution: boolean,
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

const SolutionEntryLink = ({ path }: { path: string }) => {
  const isForbidden = path === 'forbidden';

  return (
    <EntryLink
      path={path}
      text={isForbidden ? 'Řešení zamčeno' : 'Zobrazit řešení'}
      forbidden={isForbidden}
    />
  );
};

const ExerciseView = ({
  num, title, link, demand, hasSolution, path, jsml,
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
          <div className="demand">
            <div className={`demand__symbol demand__symbol--${demand}`} />
            <div className="demand__text">{demandText[demand]}</div>
          </div>
        </div>
      </div>
      <div className="exercise-assign__body">
        <JsmlContainer jsml={jsml} />
      </div>
      {hasSolution && path ? (
        <div className="exercise-assign__controls">
          <SolutionEntryLink path={path} />
        </div>
      ) : null}
    </div>
  );
};

export default ExerciseView;
