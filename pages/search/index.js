import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
import {useQuery} from 'react-query';
import ky from 'ky-universal';
import HomeBlock from '../../components/block-text-serializer';
import FlexSearch from 'flexsearch';
import Layout from '../../components/layout';
import {fetchQuery} from '../../lib/sanity';
import {menuQuery, pageQuery} from '../../lib/queries';

const Main = styled('article')`
  max-width: 700px;
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

const coresearch = {
  encode: 'advanced',
  tokenize: 'forward',
  async: false,
  worker: false,
  depth: 10,
  stemmer: 'en',
  filter: 'en'
};

const sermonflex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'preacher', 'book', 'series']
  }
});

const flex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'searchbody', 'slug']
  }
});

async function retrieveIndexes(url) {
  const data = await ky(url, {prefixUrl: 'http://localhost:3000'}).json();

  await flex.import(data.mainIndexExport);
  await sermonflex.import(data.sermonIndexExport);

  return {
    async query(filter) {
      const searchResults = await flex.search({
        query: filter,
        limit: 10,
        threshold: 5,
        depth: 3,
        field: ['title', 'searchbody']
      });

      const sermonResults = await sermonflex.search({
        query: filter,
        limit: 10,
        threshold: 5,
        depth: 3,
        field: ['title', 'preacher', 'book', 'series']
      });

      const results = searchResults.concat(sermonResults);

      return results;
    }
  };
}

function useSearchIndex(filter) {
  const {data: index} = useQuery('api/searchindex', retrieveIndexes);
  const {data: results} = useQuery(filter, filter => {
    if (index) {
      return index.query(filter);
    }
  });

  return results || [];
}

const Search = ({pageData, menuData}) => {
  const [filter, setFilter] = useState('');
  const results = useSearchIndex(filter);

  async function handleChange(event) {
    const filter = event.target.value;
    setFilter(filter);
  }

  return (
    <Layout menuData={menuData} mainData={pageData}>
      <Main>
        <HomeBlock blocks={pageData.body} />
        <input type="text" value={filter} onChange={handleChange} />
        {results.map(result => (
          <div key={result._id}>
            <Link
              href={result.pathname ? result.pathname : 'talks/' + result.slug}
            >
              <h1>{result.title}</h1>
            </Link>
            {result.searchbody ? (
              <p>{result.searchbody.slice(0, 100)}...</p>
            ) : (
              <p>
                {result.series} - {result.preacher}
                <br />
                {result.book}
              </p>
            )}
          </div>
        ))}
      </Main>
    </Layout>
  );
};

Search.propTypes = {
  menuData: PropTypes.object.isRequired,
  pageData: PropTypes.object.isRequired
};

Search.getInitialProps = async () => {
  const results = await fetchQuery(
    `{
          "menuData": ${menuQuery},
          "pageData": ${pageQuery('search')}
      }`
  );
  return results;
};

export default Search;
