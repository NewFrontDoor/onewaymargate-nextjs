/** @jsx jsx */
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import MapOverlay from './map-overlay';

const homeSection = {
  position: 'relative',
  zIndex: '1',
  display: 'grid',
  gridTemplateColumns: ['1fr', '3fr 3fr'],
  gridTemplateRows: ['200px 200px', '1fr 1fr 1fr'],
  height: [null, 'calc(100vh - 300px)'],
  color: '#444446'
};

const homeMapInner = {
  gridColumn: ['1', '1/3'],
  gridRow: ['1', '1/4']
};

const MapLayout = ({heading, actions, details, location}) => {
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div sx={homeSection}>
      <div sx={homeMapInner}>
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.GOOGLE_MAPS_API}
        >
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%'
            }}
            zoom={16}
            center={
              width < 600
                ? {
                    lat: location.location.lat,
                    lng: location.location.lng
                  }
                : {
                    lat: location.latcentrepoint,
                    lng: location.longcentrepoint
                  }
            }
            options={{
              disableDefaultUI: true
            }}
          >
            <Marker
              position={{
                lat: location.location.lat,
                lng: location.location.lng
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
      <MapOverlay
        heading={heading}
        details={details}
        actions={actions}
        lat={location.location.lat}
        long={location.location.lng}
      />
    </div>
  );
};

MapLayout.propTypes = {
  heading: PropTypes.string,
  details: PropTypes.array,
  location: PropTypes.object,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

export default MapLayout;
