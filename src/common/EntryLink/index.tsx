import Button from '../Button';
import { Lock } from '../icons';

interface Props {
  path: string,
  text: string,
  forbidden: boolean,
}

const EntryLink = ({
  path, text, forbidden,
}: Props) => {
  if (forbidden) {
    return (
      <Button icon={<Lock color="white" />}>
        {text}
      </Button>
    );
  }

  return (
    <Button href={path}>
      {text}
    </Button>
  );
};

export default EntryLink;
