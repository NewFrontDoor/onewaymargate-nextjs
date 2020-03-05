import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/header';
import Banner from './banner';
import Footer from './footer/footer';

const Layout = ({menuData, mainData, children}) => {
  return (
    <div>
      <Header navlinks={menuData.menuitems} />
      <Banner data={mainData} />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  menuData: PropTypes.object.isRequired,
  mainData: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
