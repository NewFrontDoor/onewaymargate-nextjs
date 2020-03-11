import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
import {Link as ThemeUiLink} from 'theme-ui';

const pageLookup = link => {
  switch (link) {
    case '':
      return '/';
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

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

const Link = ({link = '', variant, children, noAnchor, passedSx}) => {
  return regex.test(link) ? (
    noAnchor ? (
      <NextLink passHref href={pageLookup(link)} as={`/${link}`}>
        {children}
      </NextLink>
    ) : (
      <NextLink passHref href={pageLookup(link)} as={`/${link}`}>
        <ThemeUiLink variant={variant} sx={passedSx}>
          {children}
        </ThemeUiLink>
      </NextLink>
    )
  ) : (
    <ThemeUiLink
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      sx={passedSx}
    >
      {children}
    </ThemeUiLink>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string,
  link: PropTypes.string.isRequired,
  noAnchor: PropTypes.bool,
  passedSx: PropTypes.object
};

export default Link;
