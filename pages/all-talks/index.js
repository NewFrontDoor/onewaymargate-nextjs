/** @jsx jsx */
import {useState} from 'react';
import PropTypes from 'prop-types';
import Link from '../../components/link';
import {SermonTable} from '@newfrontdoor/sermon';
import {SearchCollection as SermonFilter} from '@newfrontdoor/search';
import HomeBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import {pageQuery, menuQuery, sermonQuery} from '../../lib/queries';
import {jsx, Styled} from 'theme-ui';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date Preached', key: 'date', searchable: false}
];

const main = {
  maxWidth: '1200px',
  margin: 'auto',
  fontSize: '1.15em',
  lineHeight: '1.8',
  color: '#444444'
};

const AllSermons = ({pageData, menuData, sermonData}) => {
  const [sermonsSubset, setSubset] = useState(sermonData);

  return (
    <Layout menuData={menuData} mainData={pageData}>
      <article sx={main}>
        <HomeBlock blocks={pageData.body} />
        <SermonFilter
          dataCollection={sermonData}
          setSubset={setSubset}
          headers={headers}
          labels={{
            searchbox: 'Filter sermons:',
            checkbox: `use 'inclusive' mode`
          }}
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

AllSermons.propTypes = {
  pageData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
  sermonData: PropTypes.array
};

AllSermons.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "pageData": ${pageQuery('all-talks')},
        "sermonData": ${sermonQuery}
    }`
  );
  return results;
};

export default AllSermons;
