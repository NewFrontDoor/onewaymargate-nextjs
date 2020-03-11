/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from './link';
import {Styled, jsx} from 'theme-ui';

const Results = ({data, searchArray}) => {
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        color: 'black'
      }}
    >
      <ul>
        {searchArray.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {data.map(item => {
        const loc = item.body.indexOf(searchArray[0]);
        return (
          <div key={item.title}>
            <Styled.h3 sx={{color: 'red'}}>
              <Link link={item.slug}>{item.title}</Link>
            </Styled.h3>
            <Styled.p
              sx={{
                fontStyle: 'italic',
                width: '600px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {loc >= 30 && '...'}
              {item.body.slice(loc < 30 ? 0 : loc - 30)}
            </Styled.p>
          </div>
        );
      })}
    </div>
  );
};

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
