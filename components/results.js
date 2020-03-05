import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  color: black;
`;

const Title = styled('h3')`
  color: red;
`;

const Preview = styled('p')`
  font-style: italic;
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Results = ({data, searchArray}) => {
  return (
    <Wrapper>
      <ul>
        {searchArray.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {data.map(item => {
        const loc = item.body.indexOf(searchArray[0]);
        return (
          <div key={item.title}>
            <Title>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </Title>
            <Preview>
              {loc >= 30 && '...'}
              {item.body.slice(loc < 30 ? 0 : loc - 30)}
            </Preview>
          </div>
        );
      })}
    </Wrapper>
  );
}

Results.propTypes = {
  searchArray: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  )
};

export default Results;
