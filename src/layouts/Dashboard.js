import React, { useState, useEffect } from 'react';
import { Switch, Link, Route, useRouteMatch } from 'react-router-dom';
import { navlinks } from '../utils/navlinks';
import PlaceList from '../components/places/PlaceList.js';
import Place from '../components/places/Place.js';
import Map from '../components/maps/Map';
import WishListList from '../components/wishlist/WishListList';
import Profile from '../components/Profile';
import requestInstance from '../requests';

export default function Dashboard() {

  const [userData, setUserData] = useState()

  useEffect(() => {
    requestInstance.get('auth/users/me/').then((res) => {
      const data = res.data
      setUserData(data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const { path } = useRouteMatch();

  return <>
    <div className="container-scroller">
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex justify-content-center">
          <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">

            <Link className="navbar-brand brand-logo" to='/'><img src={`${process.env.PUBLIC_URL}/dist/images/logo/logo.png`} alt="logo" /></Link>

            <Link className="navbar-brand brand-logo-mini" to="#"><img src={`${process.env.PUBLIC_URL}/dist/images/logo/logo.png`} alt="logo" /></Link>
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span className="mdi mdi-sort-variant"></span>
            </button>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown" id="profileDropdown">
                <img src={`${process.env.PUBLIC_URL}/dist/images/faces/face5.jpg`} alt="profile" />
                <span className="nav-profile-name">{userData ? (userData.firstname + ' ' + userData.lastname) : ''}</span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <Link className="dropdown-item" to={`${path}/profile`}>
                  <i className="mdi mdi-settings text-primary"></i>
                Profile
              </Link>
                <Link className="dropdown-item" to='#'>
                  <i className="mdi mdi-logout text-primary"></i>
                Logout
              </Link>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
            data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          {navlinks}
        </nav>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="d-flex justify-content-between flex-wrap">

                  <Switch>
                    <Route exact path={`${path}/places`}> <PlaceList /> </Route>
                    <Route exact path={`${path}/places/:id`}> <Place /> </Route>
                    <Route exact path={`${path}/maps`}> <Map /> </Route>
                    <Route exact path={`${path}/wishlist`}> <WishListList /> </Route>
                    <Route exact path={`${path}/profile`}> <Profile /> </Route>
                  </Switch>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}