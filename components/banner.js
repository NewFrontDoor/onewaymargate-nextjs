/** @jsx jsx */
import styled from '@emotion/styled';
import {jsx, Styled} from 'theme-ui';
import {readableColor} from 'polished';
import urlFor from '../lib/sanityImg';
import PropTypes from 'prop-types';

const BannerImage = styled('div')`
  opacity: ${props => (props.image ? '0.25' : '0')};
  background-image: url(${props => urlFor(props.image).url()});
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #444446;
`;

export default function Banner({data: {mainImage, title}}) {
  return (
    <div sx={{position: 'relative', backgroundColor: '#4c516d'}}>
      <BannerImage image={mainImage} />
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
}

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
