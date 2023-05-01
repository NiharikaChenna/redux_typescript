import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import UserProfile from './components/UseProfile'
import Navbar from "./Header/Navbar";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<UserProfile/>} />
        <Route path="/edit/:id" element={<UserProfile/>} />
      </Routes>
    </div>
  );
}

export default App;