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

const GridBlock = props => {
  const {items, renderProp, marginBottom, style} = props;
  return (
    <div sx={gridSx(props)}>
      {items.map(item => {
        return item.id ? (
          <div />
        ) : (
          <div
            key={item._id}
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
