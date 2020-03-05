import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import SermonBlock from './sermon-block';

const Sermons = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function SermonLayout({sermons}) {
  return (
    <Sermons>
      {sermons.map(sermon => (
        <SermonBlock
          key={sermon.id}
          title={sermon.title}
          date={sermon.date}
          preacher={sermon.preacher}
          series={sermon.series}
          book={sermon.book}
        />
      ))}
    </Sermons>
  );
}

SermonLayout.propTypes = {
  sermons: PropTypes.arrayOf(
    PropTypes.shape({
      book: PropTypes.string,
      date: PropTypes.string,
      preacher: PropTypes.string,
      series: PropTypes.string,
      title: PropTypes.string
    })
  ).isRequired
};
