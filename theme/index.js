// Theme.js
import buttons from './buttons';
import colors from './colors';
import forms from './forms';
import links from './links';
import meta from './meta';
import styles, {box} from './tag-styles';
import text from './text';
import typography from './typography';

export default {
  buttons,
  colors,
  forms,
  links,
  styles,
  box,
  text,
  ...meta,
  ...typography
};

export {getColor} from './color-functions';
