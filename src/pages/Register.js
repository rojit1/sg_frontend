import React from 'react';
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form';

import {toastContainer} from '../utils/toastr';
import {toast } from 'react-toastify';
import requestInstance from '../requests';

export default function Register() {




  const {register,handleSubmit} = useForm()

  const onSubmit = data =>{
    if(data.password !== data.re_password){
      toast.error('Password and Confirm password doesnot match', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      return
    }

    requestInstance.post('auth/users/',{
      firstname:data.firstname,
      lastname:data.lastname,
      email:data.email,
      password:data.password,
      re_password:data.re_password,
    }).then(res=>{
      if(res && res.status === 201){
        toast.info('Please Check your mail and verify', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }
    }).catch(e =>{
      if(e && e.response && e.response.status === 400){
        toast.info('Please Check your mail and verify', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
          document.getElementById("registerForm").reset();
      }
    })
  }



  return (
    <div className="container">
      {toastContainer}

      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">

          <div className="row">

            <div className="col-lg-5 d-none d-lg-block" style={
              {
                backgroundImage: `url('${process.env.PUBLIC_URL}/dist/images/img1.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            } ></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">

                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user" onSubmit={handleSubmit(onSubmit)} id="registerForm">
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" id="exampleFirstName"
                        placeholder="First Name" name="firstname" ref={register} required />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" id="exampleLastName"
                        placeholder="Last Name" name='lastname' ref={register} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                      placeholder="Email Address" name="email" ref={register} required />
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="password" className="form-control form-control-user"
                        id="exampleInputPassword" name="password" placeholder="Password" ref={register} required />
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control form-control-user"
                        id="exampleRepeatPassword" name='re_password' placeholder="Repeat Password" ref={register} required/>
                    </div>
                  </div>
                  <input type="submit" className="btn btn-primary btn-user btn-block" value="Register Account" />
                    
                               
                  <hr />
                  {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw"></i> Register with Google
                                </a>
                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a> */}
                </form>
                <hr />
                <div className="text-center">
                  {/* <a className="small" href="forgot-password.html">Forgot Password?</a> */}
                </div>
                <div className="text-center">
                  <Link className="small" to="/login">Already have an account? Login!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}