import React, { useState, useEffect } from 'react'
import { Buffer } from "buffer";
import '../App.css';
import DatePicker from 'react-date-picker';

function User() {

    const [users, setUsers] = useState([]);

    const [blockedUsers, setBlockedUsers] = useState([]);
    useEffect(() =>{
        const authtoken = localStorage.getItem('token');
        const parsedToken = JSON.parse(Buffer.from(authtoken.split('.')[1], 'base64').toString());
        const id = parsedToken.user.id;
        async function fetchuser(){
            const response = await fetch(`http://localhost:8000/api/auth/allusers/${id}`, {

            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                
                'Content-Type': 'application/json',

            },
            body: JSON.stringify()
        });
            let safeUsers = await response.json();
            console.log(blockedUsers.length);
            if(blockedUsers.length != 0){
                console.log("blockedUsers");
                safeUsers = safeUsers.filter((user) => !blockedUsers.includes(user._id));
            }
            setUsers(safeUsers);
        }
        fetchuser();
        

    }, [blockedUsers])

    const handleBlock = async (blockeduser) =>{
        const authtoken = localStorage.getItem('token');
        const parsedToken = JSON.parse(Buffer.from(authtoken.split('.')[1], 'base64').toString());
        const blocker = parsedToken.user.id;

        const response = await fetch("http://localhost:8000/api/auth/blockuser", {

            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({blockeduser, blocker})
        });
       
        const json = await response.json();
        console.log(json);
        setBlockedUsers(blockeduser);
        console.log(blockeduser)

    }
  return (
    <div className="contianer main">
        <div className="filter">
            <h5> Filter <span><i class="fa-solid fa-filter"></i></span></h5>
            <div className="input">
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">City</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Noida</a></li>
                        <li><a class="dropdown-item" href="#">Delhi</a></li>
                        <li><a class="dropdown-item" href="#">Gurgaon</a></li>
                        <li><a class="dropdown-item" href="#">Patna</a></li>
                        <li><a class="dropdown-item" href="#">Merrut</a></li>
                        <li><a class="dropdown-item" href="#">Lucknow</a></li>

                    </ul>
                    <input type="text" class="form-control" aria-label="Text input with dropdown button"/>
                </div>
                <div className=" ">
                    <p>⨀Start Date(Create Date)</p>
                    <DatePicker controls={['calendar', 'time']} touchUi={true} />
                    <p className="my-3">⨀End Date(Create Date)</p>
                    <DatePicker controls={['calendar', 'time']} touchUi={true} />

                </div>
                <div className="my-5">
                    <h5> Sort <span><i class="fa-solid fa-sort"></i></span></h5>
                    <p>⨀Created Date</p>
                    <DatePicker controls={['calendar', 'time']} touchUi={true} />
                </div>

            </div>
        </div>

        <div className="container user" style={{marginTop: '0rem'}}>
            { users.map((user) =>{
                return(
                    <div class="card "  key={user.id} style={{display: 'flex', flexDirection:'row'}}>
                        <div class="card-body ">
                            <h5>{user.name}</h5>
                            <p> {user.city}</p>
                        </div>
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Report</a></li>
                                <hr/>

                                <li><a class="dropdown-item" onClick= {()=> handleBlock(user._id)} style={{ cursor:'pointer'}}> Block</a></li>


                            </ul>
                        </div>
                    </div>
                )
            })
            }
        
        </div>
    </div>
  );
}

export default User;
