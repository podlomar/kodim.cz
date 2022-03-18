import Brand from '../Brand';
import './styles.scss';

const LandingBanner = () => {
  return (
    <div className="container landing-banner">
      <div className="landing-banner__intro">
        <Brand size="big" />
        <p className="landing-banner__lead">Programování hravě i vážně</p>
      </div>
      <img
        className="landing-banner__image"
        src="/assets/coding-room.svg"
        width="980"
        height="600"
        alt="Programátoři"
      />
    </div>
  );
};

export default LandingBanner;
