export default {
  root: {
    // Uses the theme values provided above
    fontFamily: 'body',
    fontWeight: 'body',
    margin: '0',
    padding: '0'
  },
  h1: {
    fontFamily: 'heading',
    fontWeight: 'heading',
    color: 'primary',
    mt: '0.67em',
    mb: '0.67em',
    fontSize: ['36px', '58px'],
    lineHeight: '1.2'
  },
  h2: {
    fontSize: 36,
    fontFamily: 'heading',
    color: 'primary',
    fontWeight: 'body'
  },
  h3: {
    color: 'text',
    fontSize: 24,
    fontFamily: 'heading',
    fontWeight: 'heading',
    fontStyle: 'normal',
    mt: 4,
    mb: 2
  },
  h4: {
    color: 'text',
    fontSize: 20,
    fontFamily: 'body',
    fontWeight: 'heading',
    fontStyle: 'normal',
    mt: 4,
    mb: 2
  },
  h5: {
    fontSize: 18,
    fontFamily: 'body',
    fontWeight: 'heading',
    color: 'light',
    mt: 0,
    mb: 2
  },
  p: {
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    color: 'text'
  },
  a: {
    color: 'accent',
    fontFamily: 'body',
    fontStyle: 'normal',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:visited': {
      color: 'text'
    },
    '&:hover': {
      color: 'text'
    },
    '&:active': {
      color: 'text'
    }
  },
  ul: {
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body'
  }
};

const box = {
  banner: {
    mx: 'auto',
    bg: 'banner',
    color: 'accent'
  },
  body: {
    mx: 'auto',
    bg: 'background',
    color: 'text'
  }
};

export {box};
