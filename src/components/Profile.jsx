import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import "../styles/Profile.css"
import Header from './Header'

const Profile = () => {
  let navigate = useNavigate()
  let [details,setDetails] = useState({
    name:"",
    phone:"",
    email:""
  })
  useEffect(()=>{
    axios.get("/user",{ headers: { "x-api-key":localStorage.getItem('x-api-key') }})
    .then(res=> {
      setDetails({
        name:res.data.name,
        phone:res.data.phone,
        email:res.data.email
      })
    })
    .catch(err=>console.log(err))
  },[])

  function handleEdit(event){
    navigate("/edit")
  }
  function handleLogOut(event){
    localStorage.setItem("x-api-key","")
    navigate("/signup")
  }
  return <>
    <Header />
    <div className='userdetails'>
      <h1>Hello {details.name}</h1>
      <img id = "profilePic" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt='Profile'/>
      <label>Phone: {details.phone}</label>
      <label>E-mail: {details.email}</label>
      <div className='buttons'>
        <button id = "editButton" onClick={handleEdit}>Edit</button>
        <button id = "logOutButton" onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  </>
}

export default Profile