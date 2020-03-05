import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {SermonTable} from '@newfrontdoor/sermon';
import {SearchCollection as SermonFilter} from '@newfrontdoor/search';
import HomeBlock from '../../components/block-text-serializer';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import Link from 'next/link';
import SermonGrid from '../../components/sermon-grid';
import {
  pageQuery,
  menuQuery,
  sermonQuery,
  seriesQuery
} from '../../lib/queries';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date Preached', key: 'date', searchable: false}
];

const Main = styled('article')`
  max-width: 1200px;
  padding: 20px;
  margin: auto;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

export default function Sermons({
  pageData,
  sermonData,
  seriesData,
  menuData,
  def
}) {
  const sermonsSubset = sermonData.slice(0, 10);
  return (
    <Layout menuData={menuData} mainData={pageData}>
      <Main>
        <HomeBlock blocks={pageData.body} />

        <SermonGrid sermons={sermonData} series={seriesData} def={def} />
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

Sermons.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.array
};

Sermons.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
        "menuData": ${menuQuery},
        "pageData": ${pageQuery('talks')},
        "sermonData": ${sermonQuery},
        "seriesData": ${seriesQuery}
    }`
  );
  return results;
};
