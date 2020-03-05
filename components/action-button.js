import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {readableColor} from 'polished';

const ActionStyles = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 1em;
  font-size: 0.95em;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 50%;
  grid-column-start: ${props => props.column};
  border-color: ${props =>
    props.displaystyle.style === 'custom'
      ? readableColor(
          props.displaystyle.custom_color.hex,
          props.textColors.light,
          props.textColors.dark
        )
      : props.textColors[props.displaystyle.style]};
  color: ${props =>
    props.displaystyle.style === 'custom'
      ? readableColor(
          props.displaystyle.custom_color.hex,
          props.textColors.light,
          props.textColors.dark
        )
      : props.textColors[props.displaystyle.style]};
  :hover {
    background-color: ${props =>
      props.displaystyle.style === 'custom'
        ? readableColor(
            props.displaystyle.custom_color.hex,
            props.textColors.light,
            props.textColors.dark
          )
        : props.textColors[props.displaystyle.style]};
    color: ${props =>
      props.displaystyle.style === 'custom'
        ? props.displaystyle.custom_color.hex
        : props.overlayColors[props.displaystyle.style]};
    cursor: pointer;
  }
`;

export default function Action(props) {
  const {
    link: {url, label},
    column
  } = props;
  return (
    <Link href={`/${url}`}>
      <ActionStyles key={label} column {...props}>
        {label}
      </ActionStyles>
    </Link>
  );
}
