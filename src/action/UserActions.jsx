import { 
         RegisterFail, 
         RegisterRequest, 
         RegisterSuccess, 
         clearError, 
         loadingFail, 
         loadingSuccess, 
         loadingUserRequest, 
         loginFail, 
         loginRequest, 
         loginSuccess,
         logoutFail,
         logoutSuccess,
         updateProfileFail,
         updateProfileRequest,
         updateProfileSuccess, 
        
         } 
         
         from "../Component/AuthSlices";

import axios from "axios";

export const login = (Email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post('http://localhost:8000/api/v1/login', { Email, password });
        dispatch(loginSuccess(data));
    } catch(error) {
      
      dispatch(loginFail(error.response.data.message));


    }
};

export const clearAutherror = dispatch =>{

  dispatch(clearError())

}

export const register = (userData) => async (dispatch) => {
  try {
      dispatch(RegisterRequest());

      const config = {

         headers: {
           
          'Content-type': 'multipart/form-data'

         }

      }

      const { data } = await axios.post(' http://localhost:8000/api/v1/UserRegister', userData, config);
      dispatch(RegisterSuccess(data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(RegisterFail(error.response.data.message));
    } else {
      dispatch(RegisterFail('An error occurred'));
    }
  }
};


export const loaduser = () => async (dispatch) => {

  try {
      dispatch(loadingUserRequest());

      const { data } = await axios.get('/api/v1/MyProfile');
      dispatch(loadingSuccess(data));
      
  } catch(error) {
    
    dispatch(loadingFail(error.response.data.message));

  }
};

export const logout = () => async (dispatch) => {

  try {
       await axios.get('http://localhost:8000/api/v1/logout');
      dispatch(logoutSuccess());
      
  } catch(error) {
    
    dispatch(logoutFail());

  }
};


export const updateProfile = (userData) => async (dispatch) => {
  try {
      dispatch(updateProfileRequest());

      const config = {

         headers: {
           
          'Content-type': 'multipart/form-data'

         }

      }

      const { data } = await axios.put(' http://localhost:8000/api/v1/UpdateProfile', userData, config);
      dispatch(updateProfileSuccess(data));
  } catch (error) {
      dispatch(updateProfileFail('An error occurred'));
    }
  }