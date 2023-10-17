import React, { useEffect, useState } from "react";
import './Login.css';
import axios from "axios";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faXmark} from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";


function Login(props){

    const navigate = useNavigate(); // Access the navigate function

    const {response,setresponse} = props;

    const [loading,setloading] = useState(false);

    const [error,seterror] = useState(null);


    const handleSubmit = (e) =>{
        e.preventDefault();
        setloading(true);
        var name = document.getElementById('name').value;
        var pass = document.getElementById('pass').value;
        axios.post('https://kcpsiddhartha.vercel.app/validate',{Name:name,Password:pass})
        .then((res)=>{
            setloading(false)
            setresponse(res.data);
            if(res.data.user.flag==='0'){
                navigate('/resetpassword');
            }else{
                navigate('/results'); // Redirect if status is true
            }

        })
        .catch((err)=>{
            setloading(false)
            if(err.response)
                setresponse(err.response.data)
            else
                seterror(404);

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
            {
                error===404?
                <div className='errorpage'>
                    <label className="heading503">503</label>
                    <FontAwesomeIcon className="error503" icon={faXmark}/>
                    <label>Service Unavailable</label>
                    <label>Try Again after some time (or) Contact Admin for assistance</label>
                </div>
                :
            <div>
                <form className="Loginform" onSubmit={handleSubmit}>
                    <h1>Parent's Login</h1>
                    <div className="fields">
                        <label>Admission Number</label>
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
            }
        </div>
    )
}



export default Login;