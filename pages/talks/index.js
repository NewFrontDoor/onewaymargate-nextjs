/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import {SermonTable} from '@newfrontdoor/sermon';
import HomeBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import Link from '../../components/link';
import SermonGrid from '../../components/sermon-grid';
import {
  pageQuery,
  menuQuery,
  sermonQuery,
  seriesQuery,
  defaultQuery
} from '../../lib/queries';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date Preached', key: 'date', searchable: false},
];

const main = {
  maxWidth: '1200px',
  padding: '20px',
  margin: 'auto',
  fontSize: '1.15em',
  lineHeight: '1.8',
  color: '#444444'
};

const Sermons = ({pageData, sermonData, seriesData, menuData, defaultData}) => {
  const sermonsSubset = sermonData.slice(0, 10);
  return (
    <Layout menuData={menuData} mainData={pageData}>
      <article sx={main}>
        <HomeBlock blocks={pageData.body} />
        <SermonGrid
          sermons={sermonData}
          series={seriesData}
          config={defaultData}
        />
        <SermonTable
          sermons={sermonsSubset}
          headers={headers}
          columnHide={[5]}
          sermonDirectory="talks"
          renderLink={(directory, slug, title) => (
            <Link link={`${directory}/${slug}`}>{title}</Link>
          )}
        />
      </article>
    </Layout>
  );
};

Sermons.propTypes = {
  pageData: PropTypes.object.isRequired,
  sermonData: PropTypes.array.isRequired,
  seriesData: PropTypes.array,
  menuData: PropTypes.object.isRequired,
  defaultData: PropTypes.object
};

Sermons.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "pageData": ${pageQuery('talks')},
        "sermonData": ${sermonQuery},
        "seriesData": ${seriesQuery},
        "defaultData": ${defaultQuery}
    }`
  );
  return results;
};

export default Sermons;
