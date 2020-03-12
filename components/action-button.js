/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from './link';
import {jsx} from 'theme-ui';
import {getColor} from '../theme';

const actionStyles = ({column, displaystyle}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  padding: '0 1em',
  fontSize: '0.95em',
  textAlign: 'center',
  textTransform: 'uppercase',
  border: '1px solid',
  borderRadius: '50%',
  gridColumnStart: column,
  borderColor: getColor(displaystyle),
  color: getColor(displaystyle),
  ':hover': {
    backgroundColor: getColor(displaystyle),
    color: getColor(displaystyle, true),
    cursor: 'pointer'
  }
});

const Action = props => {
  const {
    link: {url, label}
  } = props;
  return (
    <Link variant="circle" link={url}>
      <div key={label} sx={actionStyles(props)}>
        {label}
      </div>
    </Link>
  );
};

Action.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string
  })
};

Action.defaultProps = {
  link: {
    url: '404',
    label: null
  }
};

export default Action;
