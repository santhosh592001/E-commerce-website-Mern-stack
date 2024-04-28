import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export const Profile = () => {


    const {user} = useSelector(state => state.authState)

  return (
    <div className="container container-fluid pb-5">
        <h2 className="text-center mt-5 text-white">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-5 pb-5">
                <figure className='avatar avatar-profile pb-5'>
                    <img className="rounded-circle" id='Profile-img' 
                    src={user.avatar && './images/san.jpeg'} alt='Profile Image' />
                </figure>
                <Link to={'/E-commerce-website-Mern-stack/update/Myprofile'} id="edit_profile" className="btn btn-primary btn-block">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.Email}</p>

                 <h4>Joined Data</h4>
                 <p>{String(user.Createat).substring(0,10)}</p>

                 <a id='buttons' href="#" className="btn btn-danger btn-block mt-5">
                    My Orders
                </a>

                <a id='buttons' href="#" className="btn btn-primary btn-block mt-5 mx-4">
                    Change Password
                </a>
            </div>
        </div>
    </div>
  )
}

export default Profile