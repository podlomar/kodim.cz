import './styles.scss';

interface Props {
  link: string,
}

const ExerciseError = ({ link }: Props) => {
  return (
    <div className="exercise-error">
      <p><strong>CHYBA: Neplatný odkaz na cvičení</strong></p>
      <p>{ link }</p>
    </div>
  );
};

export default ExerciseError;
