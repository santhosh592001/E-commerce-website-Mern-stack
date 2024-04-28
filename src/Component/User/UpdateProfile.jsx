import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile ,clearAutherror} from '../../action/UserActions';
import { toast } from 'react-toastify';

export const UpdateProfile = () => {

    const {loading ,error, user , isUpdated} = useSelector(state => state.authState)

    const [name , setName]= useState("");
    const [Email, setEmail]= useState("");
    const [Profile, setProfile]= useState("");
    const [ProfileImage , setProfileImage]= useState('/images/avatar.jpeg');
    const dispatch = useDispatch()

    const OnchangeAvatar = (e) => {

        const reader = new FileReader
             
        reader.onload = () => {

          if(reader.readyState === 2){

            setProfileImage(reader.result)
            setProfile(e.target.files[0])

          }

        }
        reader.readAsDataURL(e.target.files[0])


    }

    const Profileupdate = (e) => {

        e.preventDefault();
      const formData =  new FormData();
      formData.append('name', name); // Use name instead of UserData.name
      formData.append('Email', Email); // Use Email instead of UserData.Email
      formData.append('Profile', Profile)
    dispatch(updateProfile(formData))
    }

    useEffect(()=>{

        if(user){

            setName(user.name)
            setEmail(user.Email)
            if(user.Profile){

                setProfileImage(user.Profile)

            }
        }

        if(isUpdated){

        toast.success("Profile Updated Successfully",{

            type: "success",
            position: 'top-center'

        })

         return;

        }

        if(error){

            toast.error(error,
              { position: "top-center",
                type: 'error',
                onOpen: ()=>{ dispatch(clearAutherror)}  
               
             })

             return
  
          }
      },[user, isUpdated, error, dispatch])

  return (
    <div className="container-container-fluid">
       <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={Profileupdate} className="shadow-lg bg-white" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5 text-dark">Update Profile</h1>

                        <div className="form-group text-dark">
                            <label htmlFor="email_field" className='pb-3' >Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={e=> setName(e.target.value)}                            />
                        </div>

                        <div className="form-group text-dark">
                            <label htmlFor="email_field" className='pb-3'>Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='Email'
                                value={Email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
              <p className='mt-2 text-dark'>Avathar</p>
              <div className='d-flex'>
           <div className='avathar mx-1'>
            
            <img  className='rounded-circle mt-2'  name="Profile" id='updateProfile' onChange={OnchangeAvatar} 
            src={ProfileImage}></img>

             </div>

                  <div className='d-flex mt-3 mx-3'>

                <input type='file' name='avatar' placeholder='Browser'/>
             
                  </div>
                  </div>
           </div>
        
        <div className='button mt-2'>

<button className='mx-3 w-100 p-2 text-white btn btn-danger'>Update</button>

        </div>
                          
                    </form>
                </div>
            </div>
        
    </div>

  )
}

export default UpdateProfile