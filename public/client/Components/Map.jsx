// import mapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { useRef, useEffect, useState } from 'react';
import createMap from '../mapCreator';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibGlhbWZvbnRlcyIsImEiOiJja3RsbzdjdmQxeGZxMnBwODJ1aWlpMjgwIn0.tQGIes1AYOO8KIoAJYHTzQ';

function Map(props) {
  const map = useRef(null);
  const [lng, setLng] = useState(-73.977137);
  const [lat, setLat] = useState(40.764626);
  const [zoom, setZoom] = useState(9);

  const {setFavorites,currentFavorites} = props;
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: 'mapBox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });
    createMap(map,setFavorites,currentFavorites);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
        map.current.on('mousemove', (e) => {
      // const test = JSON.stringify(e.lngLat);
      // console.log(test)
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="mapContainer">
      <div id="mapBox">
        <div id="menu">
          <input id="satellite-v9" type="radio" name="rtoggle" value="satellite" checked="checked" />
          <label htmlFor="satellite-v9">satellite</label>
          <input id="light-v10" type="radio" name="rtoggle" value="light" />
          <label htmlFor="light-v10">light</label>
          <input id="dark-v10" type="radio" name="rtoggle" value="dark" />
          <label htmlFor="dark-v10">dark</label>
          <input id="streets-v11" type="radio" name="rtoggle" value="streets" />
          <label htmlFor="streets-v11">streets</label>
          <input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" />
          <label htmlFor="outdoors-v11">outdoors</label>
        </div>
        <div className="statsBar">
          Longitude:
          {' '}
          {lng}
          {' '}
          | Latitude:
          {lat}
          {' '}
          | Zoom:
          {zoom}
        </div>
      </div>
    </div>
  );
}
export default Map;
