/** @jsx jsx */
import PropTypes from 'prop-types';
import placeholder from '../static/placeholder-800x200.jpg';
import {jsx, Styled} from 'theme-ui';

const listSx = {
  gridColumn: '2/3',
  listStyle: 'none',
  fontSize: '0.8em',
  padding: '0',
  marginTop: '0',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly'
};

const actionWrapper = {
  gridColumn: '2/3',
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'center',
  justifyContent: 'space-evenly',
  width: '50%',
  margin: 'auto'
};

const actionButton = {
  background: 'none',
  textTransform: 'lowercase',
  fontSize: '0.8em',
  padding: '10px 15px 10px 15px'
};

const SermonBlock = ({title, date, preacher, series, book}) => {
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '15px 1fr 15px',
        marginBottom: '4em'
      }}
    >
      <div
        sx={{
          gridColumn: '2/3',
          maxWidth: '100%',
          textAlign: 'center',
          margin: '0.5em'
        }}
      >
        <img src={placeholder} alt={title} sx={{width: '100%'}} />
      </div>
      <Styled.h2
        sx={{
          gridColumn: '2/3',
          maxWidth: '100%',
          textAlign: 'center',
          margin: '0.5em'
        }}
      >
        {title}
      </Styled.h2>
      <ul sx={listSx}>
        <li>{date}</li>
        <li>{preacher}</li>
        <li>{series}</li>
        <li>{book}</li>
      </ul>
      <section sx={actionWrapper}>
        <button type="button" sx={actionButton}>
          Details
        </button>
        <button type="button" sx={actionButton}>
          Listen
        </button>
      </section>
    </div>
  );
};

SermonBlock.propTypes = {
  book: PropTypes.string,
  date: PropTypes.string,
  preacher: PropTypes.string,
  series: PropTypes.string,
  title: PropTypes.string
};

SermonBlock.defaultProps = {
  book: null,
  date: null,
  preacher: null,
  series: null,
  title: null
};

export default SermonBlock;
