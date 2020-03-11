/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';

const gridSx = ({gap, columns, columnRawValue}) => ({
  display: 'grid',
  gridTemplateRows: 'auto',
  gap,
  gridTemplateColumns: [
    columns,
    `repeat(${Math.round(columnRawValue / 2)}, 1fr)`,
    columns
  ]
});

const GridBlock = ({
  items,
  renderProp,
  marginBottom,
  style,
  gap,
  columns,
  columnRawValue
}) => {
  return (
    <div sx={gridSx({gap, columns, columnRawValue})}>
      {items.map(item => {
        return item.id ? (
          <div key={item._key} /> // A blank item, with a name on the property 'id'
        ) : (
          <div
            key={item._key}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              marginBottom
            }}
          >
            {renderProp(item, style)}
          </div>
        );
      })}
    </div>
  );
};

GridBlock.propTypes = {
  columnRawValue: PropTypes.number.isRequired,
  columns: PropTypes.string.isRequired,
  gap: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _key: PropTypes.string.isRequired
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
