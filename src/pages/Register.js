import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Register(props) {

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:"", city:""})
    let navigate = useNavigate();

    useEffect(()=>{

        if(localStorage.getItem('token')){
            navigate('/');
        }
        
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {name, email, password, city} = credentials;
        //API call
        const response = await fetch("http://localhost:8000/api/auth/register", {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password, city })
        });
        const json = await response.json();

        if(json.success){
            localStorage.setItem('token', json.authtoken);  //saving the authtoken in the local storage.
            navigate('/');
           props.showAlert("Account created successfully", "success");

        }
        else{
           props.showAlert("User already exiests", "danger");
        } 
            
    }

    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setting the state using spread operator(jo bhi vlaue iss note object ke andar hain wo rahe lekin jo properties uske aaage likhi ja rahi hain usse inko add ya override kar dena)
    }
  return (
        <div className="container my-4 form">
            <h1> Register Ther User</h1>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name="name" id="exampleInputName" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={credentials.password} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" id="exampleInputConfirmPassword1" value={credentials.confirmPassword} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">City </label>
                    <input type="text" className="form-control" name="city" id="exampleInputConfirmPassword1" value={credentials.city} onChange={onChange} />
                </div>
                
                {/* For error */}
                <button type="submit" className="btn btn-primary" > Register </button>
                <p className="my-3">Already have an account? <Link to="/login">Login</Link></p>

            </form>
        </div>
  )
}

export default Register