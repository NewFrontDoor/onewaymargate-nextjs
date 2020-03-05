/** @jsx jsx */
import {jsx} from 'theme-ui';

const Footer = () => {
  return (
    <div
      sx={{
        zIndex: 0,
        position: 'relative',
        width: '100%',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        backgroundColor: '#3b8beb',
        color: 'white'
      }}
    >
      <div
        sx={{
          maxWidth: '1170px',
          margin: 'auto',
          minHeight: '1em',
          fontSize: '0.85rem',
          textAlign: 'center'
        }}
      >
        <p>© 2019 New Front Door</p>
      </div>
    </div>
  );
};

export default Footer;
