import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../components/block-text-serializer';
import Layout from '../components/layout';
import {menuQuery, pageQuery} from '../lib/queries';

const Main = styled('article')`
  max-width: ${props => (props.thing > 0 ? '1200px' : '700px')};
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

const Page = ({menuData, mainData}) => {
  const {body} = mainData;

  return (
    <Layout menuData={menuData} mainData={mainData}>
      <Main
        thing={
          body.filter(obj => {
            return obj._type === 'gridblock';
          }).length
        }
      >
        <SanityBlock blocks={body} />
      </Main>
    </Layout>
  );
};

Page.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

Page.getInitialProps = async ({query}) => {
  const results = await fetchQuery(
    `{
        "mainData": ${pageQuery(query.slug)},
        "menuData": ${menuQuery}
    }`
  );
  return results;
};

export default Page;
