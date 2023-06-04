import { createReducer } from "@reduxjs/toolkit";
const intitialState={
    isAuthenticated:false,
}

export const userReducer = createReducer(intitialState,{
    RegisterRequest: (state)=>{
         state.loading=true
    },
    RegisterSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;

    },
    RegisterFailure: (state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;

    },
    LoginRequest: (state)=>{
        state.loading=true
   },
   LoginSuccess: (state,action)=>{
       state.loading=false;
       state.user=action.payload;
       state.isAuthenticated=true;


   },
   LoginFailure: (state,action)=>{
       state.loading=false;
       state.error=action.payload;
       state.isAuthenticated=false;

   },

   LoadUserRequest: (state)=>{
    state.loading=true
   },
    LoadUserSuccess: (state,action)=>{
      state.loading=false;
      state.user=action.payload;
      state.isAuthenticated=true;
    },
    LoadUserFailure: (state,action)=>{
      state.loading=false;
      state.error=action.payload;
      state.isAuthenticated=false;
    },

    LogOutUserRequest: (state)=>{
        state.loading=true
       },
    LogOutUserSuccess: (state)=>{
          state.loading=false;
          state.user=null;
          state.isAuthenticated=false;
        },
    LogOutUserFailure: (state,action)=>{
          state.loading=false;
          state.error=action.payload;
          state.isAuthenticated=true;
        },

    FormRequest: (state)=>{
        state.loading=true
   },
    FormSuccess: (state,action)=>{
       state.loading=false;
       state.user=action.payload;
       

   },
     FormFailure: (state,action)=>{
       state.loading=false;
       state.error=action.payload;

   },

})