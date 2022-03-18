import './styles.scss';

interface Props {
  cs: string,
  en: string,
}

const Term = ({ cs, en }: Props) => {
  return (
    <span className="term">
      <span className="term__tooltip">{en}</span>
      <span>{cs}</span>
      <i className="term__flag" />
    </span>
  );
};

export default Term;
