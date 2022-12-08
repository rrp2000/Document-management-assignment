import React, { useEffect, useState } from 'react'
import "../styles/editUser.css"
import axios from 'axios'
import { useNavigate } from 'react-router'
import Header from './Header'


const EditUser = () => {

    let navigate = useNavigate()
    let [updateDetails, setUpdateDetails] = useState({})
    let [details,setDetails] = useState({
        name:"",
        phone:"",
        email:"",
        password:""
      })
      useEffect(()=>{
        axios.get("/user",{ headers: { "x-api-key":localStorage.getItem('x-api-key') }})
        .then(res=> {
          setDetails({
            name:res.data.name,
            phone:res.data.phone,
            email:res.data.email,
            password: res.data.password
          })
        })
        .catch(err=>console.log(err))
      },[])
      function handleClick(event){
        axios.put("/user",updateDetails,{ headers: { "x-api-key": localStorage.getItem('x-api-key') }})
        .then(res=> {
            console.log(res)
            alert("Details updated successfully")
            navigate("/profile")

          })
          .catch(err=>prompt(err.response.data.message))
      }
      function handleChange(event){
        let {name,value} = event.target

        setDetails(prev=>({
            ...prev,
            [name]:value
        }))
        setUpdateDetails(prev=>({
            ...prev,
            [name]:value
        }))
      }
    return <>
        <Header />
        <div className='edit'>
        <h1>Hey There,</h1>
        <p>You can update your details here</p>

        <img id = "profilePic" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt='Profile'/>
        <div><label>Name: </label> <input type="text" name = "name" onChange = {handleChange} value = {details.name} /> </div>
        <div><label>Phone: </label><input type="text" name = "phone" onChange = {handleChange} value = {details.phone} /> </div>
        <div><label>E-mail: </label><input type="text" name = "email" onChange = {handleChange} value = {details.email} /> </div>
        <div><label>Password: </label><input type="text" name = "password" onChange = {handleChange} value = {details.password} /> </div>
        <div><button onClick={handleClick}>Update</button></div>
    </div>
    </>
}

export default EditUser