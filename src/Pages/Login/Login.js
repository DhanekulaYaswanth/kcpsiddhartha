import React, { useEffect, useState } from "react";
import './Login.css';
import axios from "axios";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";


function Login(props){

    const navigate = useNavigate(); // Access the navigate function

    const {response,setresponse} = props;

    const [loading,setloading] = useState(false);


    const handleSubmit = (e) =>{
        e.preventDefault();
        setloading(true);
        var name = document.getElementById('name').value;
        var pass = document.getElementById('pass').value;
        axios.post('http://kcpsiddhartha.vercel.app/validate',{Name:name,Password:pass})
        .then((res)=>{
            setloading(false)
            setresponse(res.data);
            navigate('/results'); // Redirect if status is true

        })
        .catch((err)=>{
            setloading(false)
            setresponse(err.response.data)
        })
        
      }

   
      useEffect(()=>{
        if(response.length!==0){
            setresponse([])
            setloading(false)
        }
      },[])


      

    return(
        <div className="LoginContainer">
            <div>
                <form className="Loginform" onSubmit={handleSubmit}>
                    <h1>Parent's Login</h1>
                    <div className="fields">
                        <label>Roll No</label>
                        <div className="inputs">
                            <FontAwesomeIcon icon={faUser} className="inputicon"/>
                            <input type='text' id='name' placeholder="Enter Student Registration Number" required/>
                        </div>
                        {
                            response.message === 'User ID not found'?
                                <p className="error"><label className="notop">!</label>User not found</p>
                            :
                            ''
                        }
                    </div>


                    <div className="fields">
                        <label>password</label>
                        <div className="inputs">
                            <FontAwesomeIcon icon={faLock} className="inputicon"/>
                            <input type='password' id='pass' placeholder="Enter password" required/>
                        </div>
                        {
                            response.message === 'Incorrect password'?
                                <p className="error"><label className="notop">!</label>Invalid Password</p>
                            :
                            ''                            
                        }            
                        </div>

                    <div className="loading">
                    {
                        loading?
                            <Loading/>
                        :
                        <button className="submitbtn" type="submit">
                            Login
                        </button>
                    }
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Login;