import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import './global.css';
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Csv from "./components/Csv";
import ClassAttendance from "./components/ClassAttendance";
import TakeAttendance from "./components/TakeAttendance";



function App() {
 const dispatch = useDispatch()
 useEffect(()=>{
  dispatch(loadUser());
 },[])

 const {isAuthenticated} = useSelector((state)=>state.user)

  return (
 <Router>
  <Routes>
    <Route path="/" element={isAuthenticated?<Home />: <Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/csv" element={<Csv />} />
    <Route path="/viewattendance/:name" element={<ClassAttendance />} />
    <Route path="/takeattendance/:name" element={<TakeAttendance />} />
  </Routes>
 </Router>
  );
}

export default App;
