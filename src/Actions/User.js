import axios from "axios"


export const registerUser=(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:"RegisterRequest"
        })
     const{data}= await axios.post('api/v1/register',{name,email,password},{
        headers:{
            "Content-Type":'application/json'
        }
     })
     dispatch({
        type:"RegisterSuccess",
        payload: data.user,
    })
    }catch(error){
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data,

        })
    }
}


export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoginRequest"
        })
     const{data}= await axios.post('api/v1/login',{email,password},{
        headers:{
            "Content-Type":'application/json'
        }
     })
     dispatch({
        type:"LoginSuccess",
        payload: data.user,
    })
    }catch(error){
        dispatch({
            type:"LoginFailure",
            payload:error.response.data,

        })
    }
}

export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest"
        })
    const{data} =await axios.get("/api/v1/me");

     dispatch({
        type:"LoadUserSuccess",
        payload: data.user,
    })
    }catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data,

        })
    }
}   

export const form =(formData)=> async (dispatch)=>{
    try {
        dispatch({
            type:"FormRequest"
        })
       const {data} = await axios.post('api/v1/create',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
           
        }
       })
       dispatch({
        type:"FormSuccess",
        payload: data.user,
    })
    } catch (error) {
        dispatch({
            type:"FormFailure",
            payload:error.response.data,

        })
    }
}


export const logOutUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LogOutUserRequest"
        })
  await axios.get("api/v1/logout");
     dispatch({
        type:"LogOutUserSuccess",
   
    })
    }catch(error){
        dispatch({
            type:"LogOutUserFailure",
            payload:error.response.data,

        })
    }
}