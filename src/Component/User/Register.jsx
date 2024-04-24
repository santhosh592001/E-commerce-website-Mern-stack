import React, { Fragment, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearAutherror, register } from '../../action/UserActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [UserData , setUserData] = useState({


        name :"",
        Email:"",
        password:""
    });

    const [Profile, setProfile]= useState("")
    const [profileImage, setProfileImage]= useState("/images/avatar.png")
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)


    const onChange = (e) => {
         
      if(e.target.name === 'avatar'){
           
        const reader = new FileReader
             
        reader.onload = () => {

          if(reader.readyState === 2){

            setProfileImage(reader.result)
            setProfile(e.target.files[0])

          }

        }
        reader.readAsDataURL(e.target.files[0])
      }  

      else{

        setUserData({...UserData,[e.target.name]:e.target.value})

      }   

    }

    const RegistersubmitHandler = (e) => {

      e.preventDefault();
      const formData =  new FormData();
      formData.append('name' , UserData.name)
      formData.append('Email' , UserData.Email)
      formData.append('password' , UserData.password)
      formData.append('Profile' ,  Profile)
      dispatch(register(formData))
    }

    useEffect(()=>{

          if(isAuthenticated){

            navigate('/')
            return
          }


        if(error){

          toast.error(error,
            { position: "top-center",
              type: 'error',
              onOpen: ()=>{ dispatch(clearAutherror)}  
             
           });

        }

    },[error, isAuthenticated])
  

  return (
      <Fragment>
        
        <div className="container container-fluid">
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form onSubmit={RegistersubmitHandler} className="shadow-lg bg-white w-100 rounded" encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" name='name' onChange={onChange} id="name_field" className="form-control" />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='Email' 
                onChange={onChange}
              
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password' 
                onChange={onChange}
            
              />
            </div>
               
            <div className='form-group'>
              <p className='mt-2 text-dark'>Avathar</p>
              <div className='d-flex'>
           <div className='avathar mx-1'>
            
            <img  className='rounded-circle' name="avatar" src={profileImage}></img>

             </div>

                  <div className='d-flex mt-3 mx-3'>

                <input type='file' onChange={onChange} name='avatar' placeholder='Browser'/>
             
                  </div>
                  </div>
           </div>
        
        <div className='button mt-2'>

<button className='mx-3 w-100 p-2 text-white btn btn-danger' disabled={loading}>Register</button>

        </div>
           
          </form>
		  </div>
    </div>
</div>



      </Fragment>
  )
}
