import {readableColor} from 'polished';

const overlayColors = {
  blue: '#007dc5',
  light: 'white',
  dark: '#444446',
  custom: 'white'
};

const textColors = {
  blue: 'white',
  light: '#444446',
  dark: 'white',
  custom: '#444446'
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
