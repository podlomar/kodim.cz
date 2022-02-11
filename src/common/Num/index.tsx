import clsx from 'clsx';
import './styles.scss';

interface Props {
  className?: string;
  value: number;
}

const Num = ({ className, value }: Props) => {
  return (
    <div className={clsx('num', className)}>
      {value}
    </div>
  )
}

export default Num;