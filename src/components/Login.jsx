import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import "../styles/login.css"

const Login = () => {
    let [details,setDetails] = useState({
        email:"",
        password:""
    })

    let navigate = useNavigate()

    function handleChange(event){
        let {name, value}  = event.target
        setDetails(prev =>({
            ...prev,
            [name]:value
        }))
        console.log(details)
    }

    function handleLogin(event){
        axios.post("/login",details)
        .then(res => {
            alert(res.data.message)
            localStorage.setItem("x-api-key",res.data.token)
            navigate("/profile")
        }).catch(err => {
            alert(err.response.data.message)
        })
        event.preventDefault()
    }
  return (
    <div className='login'>
        <h1>Login</h1>
        <input onChange = {handleChange} name = "email" type="text" placeholder = "email" value={details.email}></input>
        <input onChange = {handleChange} name = "password" type="password" placeholder = "password" value={details.password}></input>
        <button name = "login" onClick= {handleLogin}>Login</button>
    </div>
  )
}

export default Login