import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import requestInstance from '../../requests';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { toastContainer } from '../../utils/toastr'
import 'react-toastify/dist/ReactToastify.css';
import { useStateIfMounted } from 'use-state-if-mounted'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '20px',
  }
});


export default function PlaceList() {

  const classes = useStyles();
  const [loading,setLoading] = useState(false)
  const { url } = useRouteMatch();
  const [originalPlaces,setOriginalPlaces] = useState([])
  const [places, setPlaces] = useStateIfMounted([]);


  useEffect(() => {
    setLoading(true)
    requestInstance.get('places/').then(res => {
      setPlaces(res.data.features)
      setOriginalPlaces(res.data.features)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const searchChange = (e) =>{
    let value = e.target.value
    if(value === ''){
      setPlaces(originalPlaces)
    }else{
      setPlaces(places.filter(place=>{
        return place.properties.name.toLowerCase().includes(value.toLowerCase())
      }))
    }
  }

  
  const addToWishList = (place_id) => {
    requestInstance.post('wishlist/', {
      place_id: place_id
    }).then(res => {
      if (res && res.status && res.status === 201) {
        toast.success('Added to wishlist', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }).catch(e => {
      if (e && e.response && e.response.status === 403) {
        toast.info('Already in wishlist', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
  }

  return <div className="row">
     <TextField
          id="standard-multiline-flexible"
          label="Search"
          multiline
          rowsMax={4}
          onChange={searchChange}
        />
        
        
    <div className="row">
      {toastContainer}
      {
        loading? (
          <CircularProgress style={{ width: '100px', height: '100px', textAlign: 'center', position: 'fixed', top: '50%', left: '50%' }} />
        ) : ''
      }

      {
        places.map((place, key) => {
          return <div key={key}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={place.properties.name}
                  height="180"
                  image={place.properties.image ? place.properties.image : 'http://localhost:8000/media/places/pkr.jpeg'}
                  title={place.properties.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link to={`${url}/${place.id}`}>{place.properties.name}</Link>, <small>{place.properties.subhead}</small>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {place.properties.description.length < 100 ? (place.properties.description) : (place.properties.description.slice(0, 100) + ' ... Read More')}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => addToWishList(place.id)} size="small" color="primary">
                  Add to wishlist
          </Button>
              </CardActions>
            </Card>

          </div>
        })
      }

    </div>
  </div>
}