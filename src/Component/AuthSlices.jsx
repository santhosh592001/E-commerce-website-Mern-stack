import { createSlice } from "@reduxjs/toolkit";


 const authSlice = createSlice({

    name : 'auth',
    initialState:{

        loading: false,
        isAuthenticated: false,

    },

    reducers:{

        loginRequest(state , action ){

            return{

                ...state,
                loading:true,

            }

        },

            loginSuccess(state, action){

             return{

              loading:false,
              isAuthenticated: true,
              user: action.payload.user


             }

            },

            loginFail(state,action){
                  
                return{
                    ...state,
                    loading: false,
                    error : action.payload

                }

            },
            clearError(state,action){
                  
                return{
                    ...state,
                    error : null

                }
            },

                RegisterRequest(state , action ){

                    return{
        
                        ...state,
                        loading:true,
        
                    }
        
                },
        
                    RegisterSuccess(state, action){
        
                     return{
        
                      loading:false,
                      isAuthenticated: true,
                      user: action.payload.user
        
        
                     }
        
                    },
        
                    RegisterFail(state,action){
                          
                        return{
                            ...state,
                            loading: false,
                            error : action.payload
        
                        }
        
                    },
                    loadingUserRequest(state , action ){

                        return{
            
                            ...state,
                            isAuthenticated:false,
                            loading:true,
            
                        }
            
                    },
            
                        loadingSuccess(state, action){
            
                         return{
            
                          loading:false,
                          isAuthenticated: true,
                          user: action.payload.user
            
            
                         }
            
                        },
            
                        loadingFail(state,action){
                              
                            return{
                                ...state,
                                loading: false,
                                error : action.payload
            
                            }
            
                        },
                        logoutSuccess(state, action){
            
                            return{
               
                             loading:false,
                             isAuthenticated: false,
                             user: null,
                            }
               
                           },
               
                           logoutFail(state,action){
                                 
                               return{
                                   ...state,
                                   error : action.payload
               
                               }
               
                           },
                           updateProfileRequest(state , action ){

                            return{
                
                                ...state,
                                loading:true,
                                isUpdated : false
                
                            }
                
                        },
                
                            updateProfileSuccess(state, action){
                
                             return{
                              ...state,
                              loading:false,
                              user: action.payload.user,
                              isUpdated : true
                
                             }
                
                            },
                
                            updateProfileFail(state,action){
                                  
                                return{
                                    ...state,
                                    loading: false,
                                    error : action.payload
                
                                }
                
                            },
    }
     
})

const {actions , reducer} = authSlice;

export const {
              loginRequest, 
              loginSuccess, 
              loginFail , 
              clearError,
              RegisterRequest,
              RegisterSuccess,
              RegisterFail,
              loadingUserRequest,
              loadingSuccess,
              loadingFail,
              logoutFail,
              logoutSuccess,
              updateProfileFail,
              updateProfileRequest,
              updateProfileSuccess
            }
              
              = actions;


export default reducer;