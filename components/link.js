import PropTypes from 'prop-types';
import React from 'react';
import NextLink from 'next/link';
import {Link as ThemeUiLink} from 'theme-ui';

const pageLookup = link => {
  // This depends on the fact that no sub-subdirectory of pages contains an index file
  if (link.includes('/')) {
    const urlArray = link.split('/');
    urlArray.pop();
    const root = urlArray.reduce((url, element) => {
      return url.concat('/', element);
    });
    return `/${root}/[slug]`;
  }

  switch (link) {
    case '':
    case 'talks':
    case 'search':
    case 'all-talks':
      return `/${link}`;
    default:
      return '/[slug]';
  }
};

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|api|\/api).*/;

const Link = ({
  link = '',
  children,
  isBlank,
  hasNoAnchor,
  passedSx,
  ...rest
}) => {
  if (isBlank) {
    rest.target = '_blank';
    rest.rel = 'noreferrer noopener';
  }

  return regex.test(link) ? (
    hasNoAnchor ? (
      <NextLink passHref href={pageLookup(link)} as={`/${link}`}>
        {children}
      </NextLink>
    ) : (
      <NextLink passHref href={pageLookup(link)} as={`/${link}`}>
        <ThemeUiLink sx={passedSx} {...rest}>
          {children}
        </ThemeUiLink>
      </NextLink>
    )
  ) : (
    <ThemeUiLink href={link} sx={passedSx} {...rest}>
      {children}
    </ThemeUiLink>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string,
  link: PropTypes.string.isRequired,
  isBlank: PropTypes.bool,
  hasNoAnchor: PropTypes.bool,
  passedSx: PropTypes.object
};

export default Link;
