/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from './link';
import urlFor from '../lib/sanityImg';
import BlockText from './block-text-serializer';
import {jsx, Styled} from 'theme-ui';

const actionSx = {
  textDecoration: 'none',
  padding: '10px 0',
  fontSize: '0.8em',
  textTransform: 'uppercase',
  border: '1px solid',
  borderColor: 'text',
  borderRadius: '40px',
  color: 'text',
  width: '7.25rem',
  ':hover': {
    backgroundColor: 'text',
    color: 'background',
    cursor: 'pointer'
  }
};

const LinkWrapper = ({link, children}) =>
  link ? (
    <Link link={link} variant="circle">
      {children}
    </Link>
  ) : (
    children
  );

const Card = ({header, description, shortdescription, image, link, action}) => {
  return (
    <div>
      <LinkWrapper link={link}>
        <img
          src={urlFor(image)
            .width(530)
            .height(135)
            .auto('format')
            .url()}
          alt={header}
          sx={{gridColumn: '1/1', width: '100%'}}
        />
        <Styled.h3
          sx={{
            gridColumn: '1/1',
            maxWidth: '100%',
            textAlign: 'center',
            margin: '0.5em'
          }}
        >
          {header}
        </Styled.h3>
      </LinkWrapper>
      <BlockText blocks={description} />
      {shortdescription && <Styled.p>{shortdescription}</Styled.p>}
      {link && (
        <section
          sx={{
            gridColumn: '1/1',
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'space-evenly',
            width: '50%',
            margin: 'auto'
          }}
        >
          <Link link={link} passedSx={actionSx}>
            {action}
          </Link>
        </section>
      )}
    </div>
  );
};

Card.propTypes = {
  action: PropTypes.string,
  description: PropTypes.object,
  shortdescription: PropTypes.string,
  header: PropTypes.string.isRequired,
  image: PropTypes.any,
  link: PropTypes.string.isRequired
};

Card.defaultProps = {
  action: 'VIEW PAGE',
  description: null,
  shortdescription: null,
  image: null
};

export default Card;
