import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { Buffer } from "buffer";
import '../App.css';

function Login(props) {

    const [credentials, setCredentials] = useState({ email:"", password:"" })

    let navigate = useNavigate();

    useEffect(()=>{
        
        if(localStorage.getItem('token')){
            navigate('/');
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API call
        const {email, password}  = credentials;
        const response = await fetch("http://localhost:8000/api/auth/login", {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        if(json.success){
            // redirects

            const parToken = JSON.parse(Buffer.from(json.authtoken.split('.')[1], 'base64').toString());
            localStorage.setItem('token', json.authtoken, parToken);  //saving the authtoken in the local storage.

            console.log(parToken);
            props.showAlert("User Logged in successfully", "success");
            navigate('/')

        }
        else{
            props.showAlert("invalid credentials", "danger");
        }
    }
    // on onChange works whenever we write in the input fields
    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
  return (
        <div className="container my-4 form">
            <h1> Login Ther User</h1>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={credentials.password} onChange={onChange} />
                </div>
                
                {/* For error */}
                <button type="submit" className="btn btn-primary" > Login </button>
                <p className="my-3">Don't have an account? <Link to="/register">Register New User</Link></p>

            </form>
        </div>
  )
}

export default Login