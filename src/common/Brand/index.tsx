import clsx from 'clsx';
import './styles.scss';

interface Props {
  size: string,
}

const Brand = ({ size = 'small' }: Props) => {
  return (
    <a className={clsx("brand", `brand--${size}`)} href="/">
      <div className="site-logo" />
      <div className="site-name">
        <span
          className="site-name__name"
        >Kódím</span><span
          className="site-name__tld"
        >.cz</span>
      </div>
    </a>
  )
}

export default Brand;