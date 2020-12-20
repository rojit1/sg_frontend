import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import './WishListList.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '20px',
  }
});


export default function WishListList() {
  const classes = useStyles();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false)


  const getWishList = () => {
    try {
      requestInstance.get('wishlist/').then(res => {
        setWishList(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    getWishList()
  }, [])

  const removeFromWishList = (id) => {
    requestInstance.delete('wishlist/',
      {
        data: {
          place_id: id
        }
      }).then(res => {
        if (res && res.status === 204) {
          getWishList()
        }
      }).catch(e => {
        console.log(e)
      })

  }

  return <div className="row">

    {
      loading ? (
        <CircularProgress style={{ width: '100px', height: '100px', textAlign: 'center', position: 'fixed', top: '50%', left: '50%' }} />
      ) : ''
    }

    {
      wishList.length <= 0 ? (
        <div className='no-content'>
          <h3>No data available, Please add places to wishlist that you are intrested in</h3>
        </div>
      ) : ''
    }
    {
      wishList.map((p, key) => {
        return <div key={key}>

          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="image"
                height="180"
                image={p.place.properties.image ? 'http://localhost:8000' + p.place.properties.image : 'http://localhost:8000/media/places/pkr.jpeg'}
                title={p.place.properties.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <Link to={`/dashboard/places/${p.place.id}`}>{p.place.properties.name}</Link>, <small>{p.place.properties.subhead}</small>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {p.place.properties.description.length < 100 ? (p.place.properties.description) : (p.place.properties.description.slice(0, 100) + ' ... Read More')}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => removeFromWishList(p.place.id)} size="small" color="primary">
                Remove From wishlist
          </Button>
            </CardActions>
          </Card>

        </div>
      })
    }


  </div>
}