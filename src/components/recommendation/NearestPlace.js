import { useEffect } from 'react';
import { useStateIfMounted } from 'use-state-if-mounted';
import requestInstance from '../../requests';


export default function NearestPlace() {

    const [places, setPlaces] = useStateIfMounted([])

    useEffect(() => {

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude // 28.26689 
                let lng = position.coords.longitude // 83.96851
                requestInstance.get('places/nearest/', { params: { lat: lat, lng: lng } }).then(res => {
                    setPlaces(res.data.features)
                    console.log(res.data.features)
                }).catch(e => {
                    console.log(e)
                })

            });
        } else {
            alert('Please enable geolocation location access')
        }
    }, [])

    return <>
        <section id="gallery">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-6 m-auto">
                        {
                            places.map(p => (
                                <>
                                <div key={p.id} className="card">
                                    <img src={p.properties.image} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.properties.name}</h5>
                                        <p className="card-text">
                                            {p.properties.description}
                                        </p>

                                    </div>
                                </div>  
                                <hr />
                                </>                         
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    </>
}