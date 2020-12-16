import React, { useState, useEffect } from 'react';
import { Link,useRouteMatch } from 'react-router-dom';
import requestInstance from '../../requests';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '20px',
  },
  linkname:{
    textDecoration:'none',
  }
});


export default function PlaceList() {
  const classes = useStyles();
  const {url} = useRouteMatch()
  const [places, setPlaces] = useState([])
  useEffect(() => {
    requestInstance.get('places/').then(res => {
      setPlaces(res.data.features)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const addToWishList = (place_id) =>{
    requestInstance.post('wishlist/',{
      place_id:place_id
    }).then(res=>{
      console.log(res)
    })
  }

  return <div className="row">
    {
      places.map((place,key) => {
        return <div key={key}>
          
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="180"
                  image={place.properties.image ? place.properties.image : 'http://localhost:8000/media/places/pkr.jpeg'}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  <Link className="linkname" to={`${url}/${place.id}`}>{place.properties.name}</Link>, <small>{place.properties.subhead}</small>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  {place.properties.description.length < 100?(place.properties.description):(place.properties.description.slice(0,100)+' ... Read More')}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={()=>addToWishList(place.id)} size="small" color="primary">
                  Add to wishlist
                </Button>
              </CardActions>
            </Card>
          
        </div>
      })
    }
  </div>
}