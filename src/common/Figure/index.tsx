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
        style={size ? { width: `${size}%` } : undefined}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Figure;
