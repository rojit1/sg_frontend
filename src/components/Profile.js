import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import './Profile.css';
import { useForm } from 'react-hook-form'
import requestInstance from '../requests';
import { useStateIfMounted } from 'use-state-if-mounted';


export default function Profile() {

	const { register, handleSubmit } = useForm()
	const [userDetail, setuserDetail] = useStateIfMounted({})

	const [user, setUser] = useState({
		firstname: localStorage.getItem('firstname') || null,
		lastname: localStorage.getItem('lastname') || null,
		email: localStorage.getItem('email') || null,
	})

	const onSubmit = data => {
		requestInstance.put('profile/', { country: data.country, address: data.address }).then(res => {
			console.log(res.data)
		})
	}

	const getProfile = () => {
		requestInstance.get('profile/').then(res => {
			if (res.status === 200) {
				setuserDetail(res.data)
			}
		}).catch(e => {
			if (e.response.status == 304) {
				requestInstance.post('profile/', { country: '', address: '' }).then(res => {

				}).catch(e => {

				})
			}
		})
	}

	useEffect(() => {
		getProfile()
	}, [])


	return <>
		<div className="container">
			<div className="row gutters-sm">
				<div className="col-md-4 mb-3">
					<div className="card">
						<div className="card-body">
							<div className="d-flex flex-column align-items-center text-center">
								<img src={`${process.env.PUBLIC_URL}/dist/images/faces/face5.jpg`} alt="Admin" className="rounded-circle" width="150" />
								<div className="mt-3">
									<h4>{user.firstname + ' ' + user.lastname}</h4>
									<p className="text-secondary mb-1">{user.email}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-8">
					<div className="card mb-3">
						<div className="card-body">
							<h3>Editable fields</h3> <hr />
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Country</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" name="country" defaultValue={userDetail.country || ''} ref={register} />
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h6 className="mb-0">Address</h6>
									</div>
									<div className="col-sm-9 text-secondary">
										<input type="text" name="address" defaultValue={userDetail.address || ''} ref={register} />
									</div>
								</div>
								<hr />
								<input type="submit" value="Update" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

	</>
}