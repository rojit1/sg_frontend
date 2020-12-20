import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { useStateIfMounted } from 'use-state-if-mounted'
import requestInstance from '../../requests';
import 'react-map-gl-directions/dist/mapbox-gl-directions.css'



function Maps() {
  const [viewport, setViewport] = useStateIfMounted({
    width: 1400,
    height: 800,
    latitude: 0,
    longitude: 0,
    zoom: 9
  });

  const [places, setPlaces] = useStateIfMounted([])
  const [currentLocation, setCurrentLocation] = useStateIfMounted({ lat: 0, lng: 0 })
  const [selectedPlace, setSelectedPlace] = useState(null)


  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        viewport.latitude = position.coords.latitude
        viewport.longitude = position.coords.longitude
        setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })

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
    getCurrentLocation()
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

        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>

        {
          places.map(place => {
            return <Marker key={place.id} latitude={place.geometry.coordinates[1]} longitude={place.geometry.coordinates[0]}>
              <span onClick={(e) => {
                e.preventDefault()
                setSelectedPlace(place)
              }} style={{ color: '#F37257', 'cursor': 'pointer', 'fontSize': '200%' }}><i className="mdi mdi-map-marker"></i></span>
            </Marker>
          })
        }
        <Marker latitude={currentLocation.lat} longitude={currentLocation.lng}>
          <span onClick={(e) => {
            e.preventDefault()
            alert('You are here')
          }} style={{ color: 'blue', 'cursor': 'pointer', 'fontSize': '200%' }}><i className="mdi mdi-map-marker"></i></span>
        </Marker>

        {selectedPlace ? (
          <Popup latitude={selectedPlace.geometry.coordinates[1]} longitude={selectedPlace.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPlace(null)
            }}
          >
            <div>
              <h3>{selectedPlace.properties.name}</h3>
              <img src={selectedPlace.properties.image} style={{ maxWidth: '150px' }} alt="image" />
            </div>
          </Popup>
        )
          : ''}



      </ReactMapGL>

    </div>

  );
}

export default Maps;