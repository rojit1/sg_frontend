import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import requestInstance from '../requests';

import { AuthContext } from '../context/auth';

export default function Login() {
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const [authToken, setAuthToken] = useContext(AuthContext)
  const [isError, setIsError] = useState(null);

  if (authToken) {
    history.push('/dashboard/places')
  }

  const onSubmit = (data) => {
    const { email, password } = data;
    requestInstance.post('auth/token/login/', {
      email: email,
      password: password
    }).then(res => {
      if (res && res.status === 200) {
        localStorage.setItem('auth_token', res.data.auth_token);
        requestInstance.defaults.headers['Authorization'] =
          'Token ' + localStorage.getItem('auth_token');
        setAuthToken(res.data.auth_token)
        history.push('/')
      } else {
        setIsError('Something went wrong !!!')
      }
    }).catch((e) => {
      if (e && e.response && e.response.status === 400) {
        setIsError(e.response.data.non_field_errors[0])
      }
    })
  }


  return (
    <div className="container">


      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block" style={
                  {
                    backgroundImage: `url('${process.env.PUBLIC_URL}/dist/images/img2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
                }></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    {
                      isError ? (
                        <p className="text-center text-danger">{isError}</p>
                      ) : (
                          <p></p>
                        )
                    }
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input type="email" name="email" className="form-control form-control-user"
                          id="exampleInputEmail" aria-describedby="emailHelp"
                          placeholder="Enter Email Address..." ref={register} />
                      </div>
                      <div className="form-group">
                        <input type="password" name="password" className="form-control form-control-user"
                          id="exampleInputPassword" placeholder="Password" ref={register} />
                      </div>

                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Login
                                        </button>
                      <hr />
                      
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/register">Create an Account!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )

}