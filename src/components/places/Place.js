import React, { useState, useEffect } from 'react';
import requestInstance from '../../requests';
import { useParams } from 'react-router-dom';


export default function Place() {

  const { id } = useParams();
  const [place, setPlace] = useState({
    id: "",
    type: "",
    geometry: {},
    properties: {},

  })
  useEffect(() => {
    requestInstance.get(`places/${id}/`).then(res => {
      setPlace(res.data)
    })
  }, [])

  return (

      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img width="100%" src={place.properties.image ? place.properties.image : 'http://localhost:8000/media/places/pkr.jpeg'} />
          </div>
          <div className="col-md-7">
            <h2 style={{display:'inline'}}>{place.properties.name}</h2>, &nbsp;<p style={{display:'inline'}}>{place.properties.major_district}</p>
            <p>{place.properties.subhead}</p>

            <p>{place.properties.description}</p>
            <hr />
            <p>Is in city area : {place.properties.in_city_area?'Yes':'No'}</p>
            <p>Is world herritage: {place.properties.is_world_herritage?'Yes':'No'}</p>


          </div>
        </div>
      </div>

  );
}
