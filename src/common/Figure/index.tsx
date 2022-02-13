import './styles.scss';

interface Props {
  src: string,
  alt: string,
  size?: number,
}

const Figure = ({ src, alt, size }: Props) => {
  return (
    <div className="figure">
      <img
        style={{ width: `${size ?? 100}%` }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Figure;
