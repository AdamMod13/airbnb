import { Key, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { getCenter } from 'geolib';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { SearchResults } from '../Models/SearchResults.model';

export default function Map({searchResults}: any) {

  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((result: {long: number, lat: number}) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center: any = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/erckus/cle34d4t3000c01o35ac0854o'
      style={{width: 600, height: '100%'}}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
    >
      {searchResults.map((result: {long: number, lat: number, title: string}) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            anchor="bottom"
          >
            <p 
              role="img"
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >
              <MapPinIcon className='h-6 text-white'/>
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={false}
              latitude={result.lat}
              longitude={result.long}
              anchor="bottom"
            >
              {result.title}
            </Popup>
          ): false}
        </div>
      ))}

    </ReactMapGL>
  )
}


