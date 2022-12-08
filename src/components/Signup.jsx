import React, { useEffect, useState } from "react";
import "../styles/signup.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function Signup(){
    let navigate = useNavigate
    let [details, setDetails] = useState({
        name : "",
        phone: "",
        email: "",
        password:""
    })

    function handleChange(event){
        let {name,value} = event.target

        setDetails(prev=>({
            ...prev,
            [name]:value
        }))
        console.log(details)
    }

    useEffect(()=> {},[])
    function handleSignup(event){
        axios.post("/signup",details,{'Access-Control-Request-Headers': '*'})
        .then(res=>{

            alert("submitted successfully ")
            navigate("/login")
        })
        .catch(error=>alert(error.response.data.message))
        event.preventDefault()
    }

    return <div className="signup">
        <h1>Signup</h1>
        <input onChange = {handleChange} name = "name" type="text" placeholder = "Name" value={details.name}></input>
        <input onChange = {handleChange} name = "phone" type="text" placeholder = "Phone" value={details.phone}></input>
        <input onChange = {handleChange} name = "email" type="email" placeholder = "email" value={details.email}></input>
        <input onChange = {handleChange} name = "password" type="password" placeholder = "Password" value={details.password}></input>
        <Link to = "/login">already registered?</Link>
        <button name = "signup" onClick= {handleSignup}>Signup</button>
    </div>
    
}

export default Signup