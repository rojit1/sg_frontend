import React from 'react';
import { NavLink } from 'react-router-dom';

export const navlinks = (
  <ul className="nav">
    <li className="nav-item">
      <NavLink exact className="nav-link" to="/dashboard/places">
        <i style={{ fontSize: '150%' }} className="mdi mdi-map-marker"></i> &nbsp;
        <span className="menu-title">Places</span>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact className="nav-link" to="/dashboard/maps">
        <i className="mdi mdi-google-maps"></i> &nbsp;
        <span className="menu-title">Maps</span>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact className="nav-link" to="/dashboard/favorites">
        <i className="mdi mdi-heart-outline"></i> &nbsp;
        <span className="menu-title">Favorites</span>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact className="nav-link" to="/dashboard/wishlist">
        <i className="mdi mdi-format-list-bulleted-type"></i> &nbsp;
        <span className="menu-title">Wishlist</span>
      </NavLink>
    </li>
  </ul >

)