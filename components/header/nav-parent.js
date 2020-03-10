/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from 'next/link';
import {jsx, NavLink as UILink} from 'theme-ui';

const listItem = {
  position: 'relative',
  lineHeight: ['1.6', '1.6', 'initial'],
  transitionDuration: '0.5s',
  '&:hover > ul, ul li ul:hover': {
    visibility: 'visible',
    opacity: '1',
    display: 'block'
  },
  color: ['text', 'text', 'background'],
  margin: [null, null, '0.3125em 0 -1rem 1.25em'],
  paddingBottom: [null, null, '1rem']
};

const submenuSx = {
  listStyle: 'none',
  margin: '0',
  paddingLeft: '0',
  visibility: 'hidden',
  opacity: '0',
  minWidth: '5rem',
  position: 'absolute',
  transition: 'all 0.5s ease',
  marginTop: '1rem',
  left: '0',
  display: 'none',
  color: 'text',
  padding: '0.75em 0.5em 0.75em 0.625em',
  borderRadius: '0.3125em',
  backgroundColor: 'background',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)'
};

const pageLookup = link => {
  switch (link) {
    case 'talks':
      return '/talks';
    case 'search':
      return '/search';
    case 'all-talks':
      return '/all-talks';
    default:
      return '/[slug]';
  }
};

const Navparent = ({link, text, childpages}) => {
  return (
    <li sx={listItem}>
      <Link href={pageLookup(link)} as={`/${link}`}>
        <UILink variant="nav">{text}</UILink>
      </Link>
      <ul sx={submenuSx}>
        {childpages.map(child => {
          return (
            <li key={child.slug.current} sx={{paddingBottom: '0.5em'}}>
              <Link passHref href={`/${child.slug.current}`}>
                <UILink variant="nav" sx={{color: 'inherit'}}>
                  {child.title}
                </UILink>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

Navparent.propTypes = {
  childpages: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.shape({current: PropTypes.string.isRequired}),
      title: PropTypes.string.isRequired
    })
  ),
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Navparent;
