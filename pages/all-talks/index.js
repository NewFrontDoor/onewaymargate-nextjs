import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
import {SermonTable} from '@newfrontdoor/sermon';
import {SearchCollection as SermonFilter} from '@newfrontdoor/search';
import HomeBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import {pageQuery, menuQuery, sermonQuery} from '../../lib/queries';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date Preached', key: 'date', searchable: false}
];

const Main = styled('article')`
  max-width: 1200px;
  margin: auto;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

export default function AllSermons({pageData, menuData, sermonData}) {
  const [sermonsSubset, setSubset] = useState(sermonData);

  return (
    <Layout menuData={menuData} mainData={pageData}>
      <Main>
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
            <Link href={`${directory}/${slug}`}>{title}</Link>
          )}
        />
      </Main>
    </Layout>
  );
}

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
