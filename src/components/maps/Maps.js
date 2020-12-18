import React, { useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useStateIfMounted } from 'use-state-if-mounted'
import requestInstance from '../../requests';


function Maps() {
  const [viewport, setViewport] = useStateIfMounted({
    width: 1400,
    height: 800,
    latitude: 27.7151744,
    longitude: 85.34097919999999,
    zoom: 10
  });

  const [places,setPlaces] = useStateIfMounted([])


  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        viewport.latitude = position.coords.latitude
        viewport.longitude = position.coords.longitude
      });
    } else {
      alert('Please enable geolocation location access')
    }
  }

  const getPlaceList = () => {
    requestInstance.get('places/').then(res => {
      setPlaces(res.data.features)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    // getCurrentLocation()
    getPlaceList()
  }, [])


  return (
    <div style={{ margin: 'auto' }}>

      <ReactMapGL {...viewport} mapboxApiAccessToken="pk.eyJ1Ijoicm9qaXQwMTciLCJhIjoiY2tpdHlodWg1MDZ2ZjJxbnVoNWEwemN2dyJ9.IpAPprX_FvyWF4HoEpFpDQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        {
          places.map(place=>{
            return <Marker latitude={place.geometry.coordinates[1]} longitude={place.geometry.coordinates[0]}>
            <h1 className="mdi mdi-map-marker"></h1>
          </Marker>
          })
        }

 
      </ReactMapGL>

    </div>

  );
}

export default Maps;
