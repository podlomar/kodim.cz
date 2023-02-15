import Button from '../Button';
import './styles.scss';

interface Props {
  items: Array<{
    name: string,
    title: string,
    inviteToken: string | undefined,
  }>
}

const GroupList = ({ items }: Props) => {
  return (
    <ul className="group-list">
      {items.map(({ name, title, inviteToken }) => (
        <li key={name}>
          {title}
          {' '}
          {inviteToken && <Button href={`/pozvanky/skupina/${inviteToken}`} size="small">Detail</Button>}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
