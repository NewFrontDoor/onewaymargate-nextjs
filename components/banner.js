/** @jsx jsx */
import {jsx, Styled} from 'theme-ui';
import {readableColor} from 'polished';
import urlFor from '../lib/sanityImg';
import PropTypes from 'prop-types';

const bannerImage = mainImage => ({
  opacity: `${mainImage && '0.25'}`,
  backgroundImage: `url(${urlFor(mainImage).url()})`,
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#444446'
});

const Banner = ({data: {mainImage, title}}) => {
  return (
    <div sx={{position: 'relative', backgroundColor: '#4c516d'}}>
      <div sx={bannerImage(mainImage)} />
      <div
        sx={{
          display: 'table',
          position: 'relative',
          paddingTop: ['12%', '8%'],
          paddingBottom: [null, '4%'],
          margin: 'auto'
        }}
      >
        <Styled.h1 sx={{color: `${readableColor('#4c516d')}`}}>
          {title}
        </Styled.h1>
      </div>
    </div>
  );
};

Banner.propTypes = {
  data: PropTypes.shape({
    mainImage: PropTypes.any,
    title: PropTypes.string.isRequired
  })
};

Banner.defaultProps = {
  data: {
    mainImage: null
  }
};

export default Banner;
