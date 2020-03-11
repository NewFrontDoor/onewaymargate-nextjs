/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import Link from '../link';
import Head from 'next/head';
import useWindowScroll from '@react-hook/window-scroll';
import {ReactComponent as Logo} from '../../public/OneWay.svg';
import Navigation from './navigation';

const navSx = offset => ({
  zIndex: 1000,
  position: 'fixed',
  top: 0,
  width: '100vw',
  padding: [0, 0, '0.8em 0'],
  backgroundColor: [null, null, `rgb(59, 139, 235, ${offset / 50})`]
});

const navInnerSx = {
  maxWidth: '1170px',
  margin: 'auto',
  minHeight: '2em',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: ['space-around', 'space-around', 'space-between']
};

const Header = ({navlinks}) => {
  const offset = useWindowScroll(60);
  return (
    <nav sx={navSx(offset)}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div sx={navInnerSx}>
        <Link>
          <Logo
            sx={{
              flex: '0 1 auto',
              maxWidth: '100%',
              height: ['70px', '100px'],
              width: 'auto',
              display: 'inline-block',
              fill: 'white'
            }}
          />
        </Link>
        <Navigation navlinks={navlinks} offset={offset} />
      </div>
    </nav>
  );
};

Header.propTypes = {
  navlinks: PropTypes.arrayOf(
    PropTypes.shape({
      childpages: PropTypes.array.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};

export default Header;
