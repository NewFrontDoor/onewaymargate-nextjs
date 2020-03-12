export default {
  nav: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontFamily: 'body',
    fontWeight: 'bold',
    color: 'background',
    cursor: 'pointer',
    '&:hover': {
      color: 'accent'
    }
  },
  circle: {
    display: 'contents',
    textDecoration: 'none'
  },
  footer: {
    fontFamily: 'body',
    fontWeight: 'body',
    color: 'background',
    textDecoration: 'none',
    '&:visited': {
      color: 'background'
    },
    '&:hover': {
      color: 'accent'
    },
    '&:active': {
      color: 'accent'
    }
  }
};
