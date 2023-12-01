import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { userApi } from './userApi';

export const userRegistation = createAsyncThunk('user/register', async (userData) => {
    try {
      const response = await userApi.register(userData);
      return response;
    } catch (error) {
      throw error;
    }   
  });
  

export const userLogin = createAsyncThunk('user/login', async(userData) => {
    const response = await  userApi.login(userData);
    console.log(response);
    const accessToken = response.access;
    const decodedToken = jwtDecode(accessToken);
    if(response.user.token.is_admin === true){
        localStorage.setItem('jwtTokenadmin',accessToken)

    }else{
        localStorage.setItem('jwtToken',accessToken)
        localStorage.setItem('userdetails',JSON.stringify(response.user))


    }

    return {user:response.user.auth_user , token:response.user.token, decodedToken};
    
} )

export  const superUserLogin = createAsyncThunk('superUser/login', async(userData) => {
    const response = await userApi.login(userData);
    console.log(response.user.auth_user);
    const accessToken = response.access;
    const decodedToken = jwtDecode(accessToken);
    localStorage.setItem('admindetails',JSON.stringify(response.user))
    localStorage.setItem('jwtTokenadmin', accessToken)
    return {user:response.user.auth_user ,token: response.user.token, decodedToken};
} )



const userSclice = createSlice({
    name:"user",
    initialState:{ superuser : null ,  user:null , error:(null)},
    reducers : {
        login:(state , action) => {
            if(!action.payload.is_admin){
                state.user =  action.payload;
                state.superuser =  null;
            }else{
                state.superuser = action.payload;
                state.user = null
            }
        },
        logout:(state) => {
            if(state.user){
                state.user = null;
            }else{
                state.superuser = null
            }
        },
        upateUser:(state , action) => {
            state.user = action.payload;
        },
        updateSuperuser:(state , action) => {
            state.superuser = action.payload;
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(userRegistation.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userRegistation.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                if (!action.payload.is_admin) {
                    state.user = action.payload.user;
                    state.superuser = null;
                }
            })
            .addCase(userLogin.rejected, (state, action) => {
                    state.user = null;
                    state.superuser = null;
                    state.error = action.error.message
            })
            .addCase(superUserLogin.fulfilled, (state, action) => {
                if (action.payload.token === true) {
                    state.superuser = action.payload.user;
                    state.user = null;
                }
            })
          
    }
})

export default userSclice.reducer;
export const {login,logout,updateUser , updateSuperuser} = userSclice.actions;