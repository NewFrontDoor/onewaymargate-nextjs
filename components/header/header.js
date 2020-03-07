/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import Link from 'next/link';
import useWindowScroll from '@react-hook/window-scroll';
import {ReactComponent as OneWay} from '../../public/OneWay.svg';
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
      <div sx={navInnerSx}>
        <Link href="/">
          <a>
            <OneWay
              sx={{
                flex: '0 1 auto',
                maxWidth: '100%',
                height: ['70px', '100px'],
                width: 'auto',
                display: 'inline-block'
              }}
            />
          </a>
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
