import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/header.css"

const Header = (props) => {
    
  return (
    <div id = "header">
        <Link to ="/homepage"><h1>Document.io</h1></Link>
        <div>
            <Link to = "/profile"><img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt='profile'></img></Link>
        </div>
    </div>
  )
}

export default Header