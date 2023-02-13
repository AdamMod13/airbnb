import { useState } from 'react'
import ReactMapGL from 'react-map-gl';
import { getCenter } from 'geolib';
import { SearchResults } from '../Models/SearchResults.model';

export default function Map({searchResults}: any) {

  const coordinates = searchResults.map((result: any) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/erckus/cle34d4t3000c01o35ac0854o'
      style={{width: '100%', height: '100%'}}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={evt => setViewport(evt.viewState)}
    ></ReactMapGL>
  )
}


