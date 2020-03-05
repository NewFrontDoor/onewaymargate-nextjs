import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-template-rows: auto;
  gap: ${props => props.gap};
  @media (min-width: 450px) and (max-width: 890px) {
    grid-template-columns: ${props =>
      `repeat(${Math.round(props.columnRawValue / 2)}, 1fr)`};
  }
`;

const ItemOuter = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${props => props.marginBottom};
`;

const GridBlock = props => {
  const {
    items,
    columns,
    columnRawValue,
    renderProp,
    gap,
    marginBottom,
    style
  } = props;
  return (
    <Grid columns={columns} columnRawValue={columnRawValue} gap={gap}>
      {items.map(item => {
        return item.id ? (
          <div />
        ) : (
          <ItemOuter key={item._id} marginBottom={marginBottom}>
            {renderProp(item, style)}
          </ItemOuter>
        );
      })}
    </Grid>
  );
};

GridBlock.propTypes = {
  columnRawValue: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  gap: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  ),
  marginBottom: PropTypes.string,
  renderProp: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired
};

GridBlock.defaultProps = {
  gap: '5%',
  marginBottom: '4em'
};

export default GridBlock;
