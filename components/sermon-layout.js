/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import SermonBlock from './sermon-block';

const SermonLayout = ({sermons}) => {
  return (
    <div sx={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
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
    </div>
  );
};

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

export default SermonLayout;
