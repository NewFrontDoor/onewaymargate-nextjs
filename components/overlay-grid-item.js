/** @jsx jsx */
import urlFor from '../lib/sanityImg';
import PropTypes from 'prop-types';
import Link from './link';
import {jsx, Styled} from 'theme-ui';

const headerSx = {
  gridColumn: '1/1',
  gridRow: '1/1',
  textAlign: 'left',
  m: '10px',
  zIndex: 20,
  color: 'background',
  alignSelf: 'end'
};

const shadedOverlay = {
  gridRow: '1/1',
  gridColumn: '1/1',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.2)',
  zIndex: '19'
};

const LinkWrapper = ({link, children}) =>
  link ? (
    <Link link={link} variant="circle">
      {children}
    </Link>
  ) : (
    <div sx={{display: 'contents'}}>{children}</div>
  );

const Overlay = ({header, image, link, slug}) => (
  <LinkWrapper link={link || slug?.current}>
    <img
      src={urlFor(image)
        .width(350)
        .height(350)
        .auto('format')
        .url()}
      alt={header}
      sx={{gridRow: '1/1', gridColumn: '1/1', width: '100%'}}
    />
    <div sx={shadedOverlay} />
    <Styled.h5 sx={headerSx}>{header}</Styled.h5>
  </LinkWrapper>
);

Overlay.propTypes = {
  header: PropTypes.string.isRequired,
  image: PropTypes.any,
  link: PropTypes.string,
  slug: PropTypes.object
};

Overlay.defaultProps = {
  image: null,
  link: null,
  slug: null
};

export default Overlay;
