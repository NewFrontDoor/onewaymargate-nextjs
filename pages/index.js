import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/header';
import Head from 'next/head';
import Footer from '../components/footer/footer';
import {fetchQuery} from '../lib/sanity';
import HomeLayout from '../components/home-layout';
import MapLayout from '../components/map/map-layout';
import {mainQuery, menuQuery} from '../lib/queries';

const Home = ({mainData, menuData}) => {
  const {content} = mainData;
  return (
    <div>
      <Head>
        <title>OneWay Margate - Home</title>
      </Head>
      <Header navlinks={menuData.menuitems} />
      {content.map((segment, index) => {
        if (segment.location) {
          return <MapLayout key={'map' + index} {...segment} />;
        }

        return (
          <HomeLayout
            key={segment.heading}
            {...segment}
            isFirstPage={index === 0}
          />
        );
      })}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

Home.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "mainData": ${mainQuery},
        "menuData": ${menuQuery}
    }`
  );

  return results;
};

export default Home;
