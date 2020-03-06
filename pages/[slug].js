/** @jsx jsx */
import PropTypes from 'prop-types';
import {fetchQuery} from '../lib/sanity';
import SanityBlock from '../components/block-text-serializer';
import Layout from '../components/layout';
import {menuQuery, pageQuery} from '../lib/queries';
import {jsx} from 'theme-ui';

const main = gridblock => ({
  maxWidth: gridblock > 0 ? '1200px' : '700px',
  margin: 'auto',
  padding: '15px',
  fontSize: '1.15em',
  lineHeight: '1.8',
  color: '#444444'
});

const Page = ({menuData, mainData}) => {
  const {body} = mainData;

  return (
    <Layout menuData={menuData} mainData={mainData}>
      <article
        sx={main(
          body.filter(obj => {
            return obj._type === 'gridblock';
          }).length
        )}
      >
        <SanityBlock blocks={body} />
      </article>
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
