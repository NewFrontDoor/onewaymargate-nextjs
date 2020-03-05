/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import styled from '@emotion/styled';
import Link from 'next/link';
import useWindowScroll from '@react-hook/window-scroll';
import OneWay from '../../public/OneWay.svg';
import Navigation from './navigation';

const Nav = styled('nav')`
  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 0;
  @media (min-width: 768px) {
    padding: 0.8em 0;
    background-color: rgb(59, 139, 235, ${props => props.offset / 50});
  }
`;

const NavInner = styled('div')`
  max-width: 1170px;
  margin: auto;
  min-height: 2em;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

const Header = ({navlinks}) => {
  const offset = useWindowScroll(60);
  return (
    <Nav offset={offset}>
      <NavInner>
        <Link href="/">
          <OneWay
            sx={{
              flex: '0 1 auto',
              maxWidth: '100%',
              height: ['70px', '100px'],
              width: 'auto',
              display: 'inline-block'
            }}
          />
        </Link>
        <Navigation navlinks={navlinks} offset={offset} />
      </NavInner>
    </Nav>
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
