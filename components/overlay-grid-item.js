/** @jsx jsx */
import urlFor from '../lib/sanityImg';
import PropTypes from 'prop-types';
import Link from 'next/link';
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

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

const Overlay = ({header, image, link, slug}) =>
  !link && !slug ? (
    <div sx={{display: 'contents'}}>
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
    </div>
  ) : regex.test(link || slug) ? (
    <Link passHref href={`/${link || slug.current}`}>
      <a sx={{display: 'contents'}}>
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
      </a>
    </Link>
  ) : (
    <Styled.a sx={{display: 'contents'}} href={link}>
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
    </Styled.a>
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
