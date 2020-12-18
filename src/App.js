import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './layouts/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Activate from './pages/Activate';
import { AuthProvider } from './context/auth';
import PrivateRoute from './PrivateRoute';


function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/login"> <Login /> </Route>
          <Route path="/register"> <Register /> </Route>
          <Route path="/activate/:uid/:token"> <Activate /> </Route>
          <Redirect exact from='/' to='/dashboard/places' />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
