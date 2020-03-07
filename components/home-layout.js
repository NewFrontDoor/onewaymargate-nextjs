/** @jsx jsx */
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {useSpring, animated} from 'react-spring';
import urlFor from '../lib/sanityImg';
import BlockText from './block-text-serializer';
import Action from './action-button';
import Arrow from './arrow';
import {getColor} from '../lib/color-functions';

const overlayColors = {
  blue: '#007dc5',
  light: 'background',
  dark: 'text'
};

const opacities = {
  blue: 0.15,
  light: 0.2,
  dark: 0.2,
  custom: 0.15
};

const containerSx = actions => ({
  display: 'grid',
  gridGap: '2em',
  gridTemplateColumns: [
    '1fr 100px 100px 1fr',
    `auto repeat(${actions}, 7.25rem) auto`
  ],
  gridTemplateRows: [null, '7.25rem'],
  height: ['100px', 'auto']
});

const homeSection = ({isFirstPage, styling}) => ({
  position: 'relative',
  zIndex: '1',
  height: isFirstPage && '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: '1fr 1fr 1fr',
  color: getColor(styling)
});

const homeSectionBackground = ({styling}) => ({
  backgroundColor:
    styling.style === 'custom'
      ? styling.custom_color.hex
      : overlayColors[styling.style],
  width: '100%',
  position: 'relative'
});

const imageStyle = {
  objectFit: 'cover',
  position: 'absolute',
  top: '0',
  width: '100%',
  height: '100%'
};

const homeSectionInner = {
  gridRow: '2',
  maxWidth: '980px',
  margin: 'auto',
  paddingTop: '6.25rem',
  paddingBottom: '6.25rem',
  textAlign: 'center',
  fontFamily: 'rubik, proxima-nova, helvetica neue, arial, sans-serif',
  verticalAlign: 'middle'
};

const HomeLayout = props => {
  const {heading, blurb, actions, background, styling, isFirstPage} = props;
  const [fade, set] = useSpring(() => ({opacity: 0, config: {duration: 500}}));

  return (
    <section sx={homeSectionBackground({styling})}>
      <animated.img
        src={urlFor(background).url()}
        sx={{...imageStyle, opacity: opacities[styling.style]}}
        style={fade}
        onLoad={() => set({opacity: 0.15})}
      />
      <div sx={homeSection(props)}>
        <div sx={homeSectionInner}>
          <h1 sx={{variant: 'text.homeH1'}}>{heading}</h1>
          {blurb && (
            <div sx={{variant: 'text.homeBlurb'}}>
              <BlockText blocks={blurb} />
            </div>
          )}
          {actions && (
            <div sx={containerSx(actions.length)}>
              {actions.map((link, index) => (
                <Action
                  key={link.url}
                  link={link}
                  column={index + 2}
                  displaystyle={styling}
                />
              ))}
            </div>
          )}
        </div>
        {isFirstPage && <Arrow />}
      </div>
    </section>
  );
};

HomeLayout.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string
      })
    })
  ),
  background: PropTypes.object,
  blurb: PropTypes.array,
  isFirstPage: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  styling: PropTypes.object.isRequired
};

HomeLayout.defaultProps = {
  actions: null
};

export default HomeLayout;
