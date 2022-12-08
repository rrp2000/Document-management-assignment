import Signup from './components/Signup';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './components/Login';
import Profile from './components/Profile';
import EditUser from './components/EditUser';
import Homepage from './components/Homepage';

function App() {
  let token = localStorage.getItem("x-api-key")
  console.log(token)
  let home = token?<Homepage />:<Signup />
  return <Router>
    <Routes>
      <Route path='/' element = {home} />
      <Route path='/signup' element = {<Signup />} />
      <Route path='/login' element = {<Login />} />
      <Route path='/profile' element = {<Profile />} />
      <Route path='/edit' element = {<EditUser />} />
      <Route path= "/homepage" element = {<Homepage />} />
    </Routes>
  </Router>
}

export default App;
