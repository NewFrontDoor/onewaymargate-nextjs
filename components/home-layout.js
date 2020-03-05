/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {readableColor} from 'polished';
import {useSpring, animated} from 'react-spring';
import urlFor from '../lib/sanityImg';
import BlockText from './block-text-serializer';
import Action from './action-button';
import Arrow from './arrow';

const overlayColors = {
  blue: '#007dc5',
  light: 'white',
  dark: '#444446'
};

const textColors = {
  blue: 'white',
  light: '#444446',
  dark: 'white',
  custom: '#444446'
};

const opacities = {
  blue: 0.15,
  light: 0.2,
  dark: 0.2,
  custom: 0.15
};

const Container = styled('div')`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: 1fr 100px 100px 1fr;
  height: 100px;
  @media (min-width: 420px) {
    grid-template-columns: ${props => props.columns};
    grid-template-rows: ${props => props.rows};
    grid-gap: ${props => props.columnGap};
    height: auto;
  }
`;

const HomeSection = styled('div')`
  position: relative;
  z-index: 1;
  height: ${props => (props.firstpage ? '100vh' : 'calc(100vh - 100px)')};
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  color: ${props =>
    props.displaystyle.style === 'custom'
      ? readableColor(
          props.displaystyle.custom_color.hex,
          textColors.light,
          textColors.dark
        )
      : textColors[props.displaystyle.style]};
`;

const HomeSectionBackground = styled('section')`
  background-color: ${props =>
    props.displaystyle.style === 'custom'
      ? props.displaystyle.custom_color.hex
      : overlayColors[props.displaystyle.style]};
  width: 100%;
  position: relative;
`;

const HomeSectionBackgroundImage = styled(animated.img)`
  opacity: ${props => opacities[props.displaystyle]};
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const HomeSectionInner = styled('div')`
  grid-row: 2;
  max-width: 980px;
  margin: auto;
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
  text-align: center;
  font-family: rubik, proxima-nova, helvetica neue, arial, sans-serif;
  vertical-align: middle;
`;

const HomeLayout = (props) => {
  const {heading, blurb, actions, background, styling, firstpage} = props;
  const displayActions = actions.length > 0;
  const [fade, set] = useSpring(() => ({opacity: 0, config: {duration: 500}}));

  return (
    <HomeSectionBackground displaystyle={styling}>
      <HomeSectionBackgroundImage
        src={urlFor(background).url()}
        displaystyle={styling.style}
        style={fade}
        onLoad={() => set({opacity: 0.15})}
      />
      <HomeSection displaystyle={styling} firstpage={firstpage}>
        <HomeSectionInner>
          <h1 sx={{variant: 'text.homeH1'}}>{heading}</h1>
          {blurb && (
            <div sx={{variant: 'text.homeBlurb'}}>
              <BlockText blocks={blurb} />
            </div>
          )}
          {displayActions && (
            <Container
              columns={`auto repeat(${actions.length}, 7.25rem) auto`}
              rows="7.25rem"
              gap="2rem"
            >
              {actions.map((link, index) => (
                <Action
                  key={link.url}
                  link={link}
                  column={index + 2}
                  textColors={textColors}
                  overlayColors={overlayColors}
                  displaystyle={styling}
                />
              ))}
            </Container>
          )}
        </HomeSectionInner>
        {firstpage && <Arrow />}
      </HomeSection>
    </HomeSectionBackground>
  );
}

HomeLayout.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string
      })
    })
  ).isRequired,
  background: PropTypes.object,
  blurb: PropTypes.array,
  firstpage: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  styling: PropTypes.object.isRequired
};

export default HomeLayout;
