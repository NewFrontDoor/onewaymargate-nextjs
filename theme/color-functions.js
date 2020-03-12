import {readableColor} from 'polished';

const overlayColors = {
  blue: '#007dc5',
  light: 'background',
  dark: 'text',
  custom: 'background'
};

const textColors = {
  blue: 'background',
  light: 'text',
  dark: 'background',
  custom: 'text'
};

const getColor = (displaystyle, overlay) => {
  if (overlay) {
    return overlayColors[displaystyle.style];
  }

  if (displaystyle.style === 'custom') {
    return readableColor(
      displaystyle.custom_color.hex,
      textColors.light,
      textColors.dark
    );
  }

  return textColors[displaystyle.style];
};

export {getColor};
