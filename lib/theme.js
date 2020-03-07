// Theme.js
export default {
  useCustomProperties: true,
  useBodyStyles: true,
  breakpoints: ['40em', '56em', '64em'],
  text: {
    menu: {
      color: 'background',
      fontFamily: 'heading',
      px: 0,
      py: 0,
      textTransform: 'lowercase',
      textDecoration: 'none',
      fontSize: 30,
      cursor: 'pointer'
    },
    homeH1: {
      fontFamily: 'heading',
      marginBottom: '35px',
      fontSize: ['36px', '58px'],
      fontWeight: '400',
      marginTop: '0',
      lineHeight: '1.2'
    },
    homeBlurb: {
      fontSize: '1.8rem',
      fontWeight: '400',
      marginTop: '2.1875rem',
      marginBottom: '2.1875rem'
    },
    default: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      color: 'text'
    }
  },
  fonts: {
    body: '"rubik", system-ui, sans-serif',
    heading: '"Noto serif", serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em'
  },
  colors: {
    background: '#FFF',
    text: '#444446',
    primary: '#3C5A72',
    accent: '#CF9901',
    light: '#707070',
    link: 'accent',
    banner: '#F1F1F1',
    footerBg: 'text',
    none: 'none'
  },
  links: {
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
  },
  styles: {
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
  },
  buttons: {
    home: {
      fontFamily: 'body',
      borderRadius: '3px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'background',
      fontSize: 16,
      padding: '20px 40px',
      minWidth: '250px',
      cursor: 'pointer',
      color: 'background',
      bg: 'none',
      '&:hover': {
        bg: 'background',
        color: 'text'
      }
    },
    map: {
      fontFamily: 'body',
      textTransform: 'uppercase',
      fontSize: '0.8em',
      padding: '10px 0',
      border: '1px solid',
      borderColor: 'text',
      borderRadius: '18px',
      color: 'text',
      backgroundColor: 'none',
      ':hover': {
        backgroundColor: 'text',
        color: 'background',
        cursor: 'pointer'
      }
    }
  },
  box: {
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
  },
  forms: {
    label: {
      display: 'block',
      gridColumn: '1 / 2',
      paddingBottom: '5px'
    },
    input: {
      '&:focus': {
        outline: '3px solid gold'
      }
    },
    select: {
      '&:focus': {
        outline: '3px solid gold'
      }
    },
    textarea: {
      '&:focus': {
        outline: '3px solid gold'
      }
    }
  },
  sizes: {
    container: '60vw'
  }
};
