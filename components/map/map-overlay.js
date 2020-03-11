/** @jsx jsx */
import PropTypes from 'prop-types';
import Link from '../link';
import {ReactComponent as ClockIcon} from './clock.svg';
import {ReactComponent as EmailIcon} from './email.svg';
import {ReactComponent as LocIcon} from './location.svg';
import {ReactComponent as PhoneIcon} from './phone.svg';
import {jsx, Button, Styled} from 'theme-ui';

const containerSx = columns => ({
  display: 'grid',
  gridTemplateColumns: [null, `auto repeat(${columns}, 7.25rem) auto`],
  gridTemplateRows: [null, '1fr'],
  gridGap: ['0.5rem', '20px']
});

const overlay = {
  border: 'white 1px solid',
  gridColumn: ['1', '2'],
  gridRow: '2',
  background: 'rgba(256, 256, 256, 1)',
  borderRadius: '4px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: ['1em', '2em'],
  fontFamily: 'rubik, proxima-nova, helvetica neue, arial, sans-serif',
  zIndex: '1',
  boxShadow: [null, '0 2px 12px rgba(0, 0, 0, 0.1)']
};

const types = {
  telephone: (
    <PhoneIcon
      sx={{verticalAlign: 'middle', marginRight: '10px', color: 'red'}}
      width="25px"
    />
  ),
  location: (
    <LocIcon sx={{verticalAlign: 'middle', marginRight: '10px'}} width="25px" />
  ),
  time: (
    <ClockIcon
      sx={{verticalAlign: 'middle', marginRight: '10px'}}
      width="25px"
    />
  ),
  email: (
    <EmailIcon
      sx={{verticalAlign: 'middle', marginRight: '10px'}}
      width="25px"
    />
  )
};

const MapLink = ({url, children, column}) => {
  return (
    <Link hasNoAnchor variant="circle" link={url}>
      <Button variant="map" sx={{gridColumnStart: [column + 1, column + 2]}}>
        {children}
      </Button>
    </Link>
  );
};

MapLink.propTypes = {
  children: PropTypes.node,
  column: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
};

const MapOverlay = ({heading, details, actions, lat, long}) => {
  return (
    <div sx={overlay}>
      {heading && (
        <Styled.h2
          sx={{
            marginTop: '0',
            lineHeight: '1'
          }}
        >
          {heading}
        </Styled.h2>
      )}
      {details.length > 0 &&
        details.map(detail => (
          <div key={detail.value} sx={{paddingBottom: '10px'}}>
            {types[detail.type]}
            {detail.value}
          </div>
        ))}
      {actions.length > 0 && (
        <div key="actions" sx={containerSx(actions.length)}>
          {actions.map((link, index) => {
            if (link.name === 'directions') {
              return (
                <MapLink
                  key={link.label}
                  column={index}
                  url={`https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`}
                >
                  {link.label}
                </MapLink>
              );
            }

            if (link.name === 'pagereference') {
              return (
                <MapLink key={link.url} column={index} url={link.url}>
                  {link.label}
                </MapLink>
              );
            }

            return (
              <MapLink key={link.url} column={index} url={link.url}>
                {link.label}
              </MapLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

MapOverlay.propTypes = {
  actions: PropTypes.array.isRequired,
  details: PropTypes.array.isRequired,
  heading: PropTypes.string,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired
};

export default MapOverlay;
