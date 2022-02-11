import './styles.scss';

interface Props {
  image: 'playfulness' | 'warmth' | 'knowledge';
  title: string;
  text: string;
};

const CodexCard = ({ image, title, text }: Props) => {
  return (
    <div className="codex-card">
      <div className={`codex-card__image ${image}`} />
      <div className="codex-card__body">
        <div className="codex-card__title">{title}</div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CodexCard;