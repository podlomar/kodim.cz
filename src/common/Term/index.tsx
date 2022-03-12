import './styles.scss';

interface Props {
  cs: string,
  en: string,
}

const Term = ({ cs, en }: Props) => {
  return (
    <span data-tip={en} className="term">
      <span>{cs}</span>
      <i className="term__flag" />
    </span>
  );
};

export default Term;
