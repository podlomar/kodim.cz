import './styles.scss';

interface Props {
  user: string,
  id: string,
  tab: string,
};

const CodePen = ({ user, id, tab }: Props) => {
  return (
    <iframe
      className="codepen"
      scrolling="no"
      src={`https://codepen.io/${user}/embed/${id}?default-tab=${tab}&theme-id=dark`}
      frameBorder="no"
      loading="lazy"
      allowFullScreen
    />
  );
};

export default CodePen;
