import './styles.scss';

interface Props {
  uid: string
};

const YouTubeVideo = ({ uid }: Props) => {
  return (
    <div
      className="video-16-9"
    >
      <iframe
        src={`https://www.youtube.com/embed/${uid}`}
        frameBorder="0"
        allowFullScreen={false}
      />
    </div>
  );
};

export default YouTubeVideo;
