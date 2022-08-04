import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import { Alert } from "./components/Alert";

function App() {

  const[alert, setalert] = useState(null);
  // we want to show different type of alert ex(success, failure, denger etc)// 
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type       // initiallly alert was null now alert is an object
    });

    setTimeout(() => {
      setalert(null);
    }, 2000);

  }

  return (
    <BrowserRouter>
      <Alert alert ={alert}/>
      <Routes>
        <Route path="/register" element={<Register showAlert={showAlert} />} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/" element={<Home  showAlert={showAlert} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App