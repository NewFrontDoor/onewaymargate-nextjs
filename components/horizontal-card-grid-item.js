/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from './link';
import BlockText from './block-text-serializer';
import urlFor from '../lib/sanityImg';
import {jsx, Styled} from 'theme-ui';

const LinkWrapper = ({link, slug, children}) =>
  link || slug ? (
    <Link link={link || slug.current} variant="circle">
      {children}
    </Link>
  ) : (
    children
  );

LinkWrapper.propTypes = {
  children: PropTypes.any,
  link: PropTypes.string,
  slug: PropTypes.shape({
    current: PropTypes.string
  })
};

const HorizontalCard = props => {
  const {
    header,
    title,
    description,
    shortdescription,
    image,
    mainImage
  } = props;
  return (
    <section
      sx={{
        display: 'grid',
        gridTemplateColumns: [null, '200px 1fr'],
        gap: [null, '20px']
      }}
    >
      <LinkWrapper {...props}>
        <img
          src={urlFor(image || mainImage)
            .width(200)
            .height(200)
            .auto('format')
            .url()}
          alt={header || title}
        />
      </LinkWrapper>
      <div>
        <LinkWrapper {...props}>
          <Styled.h3 sx={{maxWidth: '100%', m: 0, mb: '30px'}}>
            {header || title}
          </Styled.h3>
        </LinkWrapper>
        {description && <BlockText blocks={description} />}
        {shortdescription && <Styled.p>{shortdescription}</Styled.p>}
      </div>
    </section>
  );
};

HorizontalCard.propTypes = {
  description: PropTypes.object,
  header: PropTypes.string.isRequired,
  image: PropTypes.any,
  link: PropTypes.string.isRequired,
  mainImage: PropTypes.any,
  shortdescription: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

HorizontalCard.defaultProps = {
  description: null,
  image: null,
  mainImage: null,
  shortdescription: null
};

export default HorizontalCard;
