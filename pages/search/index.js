import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
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

export default function Search({pageData, menuData}) {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState(null);
  const [flexindex, setFlexIndex] = useState(flex);
  const [sermonflexindex, setSermonFlexIndex] = useState(sermonflex);

  async function handleChange(event) {
    const filter = event.target.value;
    const results = await flexindex
      .search({
        query: filter,
        limit: 10,
        threshold: 5,
        depth: 3,
        field: ['title', 'searchbody']
      })
      .concat(
        sermonflexindex.search({
          query: filter,
          limit: 10,
          threshold: 5,
          depth: 3,
          field: ['title', 'preacher', 'book', 'series']
        })
      );
    setResults(results);
    setFilter(filter);
  };

  async function retrieveIndexes() {
    const data = await fetch('http://localhost:3000/api/searchindex');
    const parsed = await data.json();
    await flex.import(parsed.mainIndexExport);
    await sermonflex.import(parsed.sermonIndexExport);
  }

  useEffect(() => {
    retrieveIndexes();
  }, []);

  return (
    <Layout menuData={menuData} mainData={pageData}>
      <Main>
        <HomeBlock blocks={pageData.body} />
        <input type="text" value={filter} onChange={handleChange} />
        {results &&
          results.map(result => (
            <div key={result._id}>
              <Link
                href={
                  result.pathname ? result.pathname : 'talks/' + result.slug
                }
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
}

Search.propTypes = {
  pageData: PropTypes.object
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
