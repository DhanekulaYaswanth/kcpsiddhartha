import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import './Reset.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

function Reset(props) {

  const {response} = props;
  const navigate = useNavigate(); // Access the navigate function

  const [password,setPassword] = useState([false,false]);

  const [criteria,setcriteria] = useState(['','','','',''])

  const [passtest,setpasstest] = useState(false);


  const [status,setstatus] = useState(null);

  const handlePassword = (e) =>{
    if(e>1){
      const data = [...password];
      data[e]=!data[e]
      setPassword(data);
    }
  }


  const handleChecks = (e) => {
    const newPassword = e.target.value;
    var data = [...criteria]
    data[0] = /[a-z]/.test(newPassword); //checks small 
    data[1] = /[A-Z]/.test(newPassword); //checks capital
    data[2] = /\d/.test(newPassword); //checks for digits
    data[3] = /[@$!%*?&]/.test(newPassword); //checks for special characters
    data[4] = newPassword.length>=8 && newPassword.length<=15; //checks for length

    setcriteria(data)
  };




  const handleSubmit = (e) =>{
    e.preventDefault();
    const pass1 = document.getElementById('passtext1') || document.getElementById('pass1');
    const pass2 = document.getElementById('passtext2') || document.getElementById('pass2');
    var t = criteria[0] && criteria[1] && criteria[2] && criteria[3] && criteria[4]
    if(pass1.value===pass2.value && t){
      setstatus(false);
      axios.post('https://kcpsiddhartha.vercel.app/resetpass',{'id':response.user.admno,'password':pass1.value})
      .then((res)=>{
        setstatus(res.data.status)
      })
      .catch((err)=>{
        setstatus(null)
        console.log(err);
      })
    }else{
      setpasstest(true)
    }
  }

  useEffect(()=>{
    if(response.length===0){
        navigate('/'); // Redirect if status is true
    }
 },[response])






  return (
    <div className="resetcontainer">
        {
          status?
          <div className='resetsuccesfull'>
              <label className='adno'>Admission No : {response.user.admno}</label>
              <label className='resetok'>&#x2713;</label>
              <label>Password Reset Succesfull!</label>
              <label>Click here to <Link to='/'>Login</Link> to see the result</label>
          </div>
          :
          <form className='resetform' onSubmit={handleSubmit}>
            <div>
              <h1 className='resettitle'>Reset Password</h1>
              {
                response.length===0?
                ''
                :
                <label className='admno'>Admission No : {response.user.admno}</label>
              }
            </div>
           
            <div className='resetinputs'>
                <label>Password</label>
                <div>
                  {
                    password[2]?
                    <input type='text' id='passtext1' placeholder='enter your password' onChange={handleChecks} required/>
                    :
                    <input type='password' id='pass1' placeholder='enter your password' onChange={handleChecks} required/>

                  }
                  <FontAwesomeIcon icon={faEye} className='eye' onClick={()=>handlePassword(2)}/>
                  {
                    password[2]?
                    ''
                    :
                    <label className='strike' onClick={()=>handlePassword(2)}></label>
                  }
                </div>
            </div>
            <div className='criteria'>
                <div>
                    <label className='check' style={{color:criteria[0]?'rgb(0, 255, 0)':'rgb(255, 21, 0)'}}>{criteria[0]?<>&#x2713;</>:'!'}</label>
                    <label>Atleast one small letter</label>
                </div>
                <div>
                  <label className='check' style={{color:criteria[1]?'rgb(0, 255, 0)':'rgb(255, 21, 0)'}}>{criteria[1]?<>&#x2713;</>:'!'}</label>
                  <label>Atleast one capital letter</label>
                </div>
                <div>
                    <label className='check' style={{color:criteria[2]?'rgb(0, 255, 0)':'rgb(255, 21, 0)'}}>{criteria[2]?<>&#x2713;</>:'!'}</label>
                    <label>Atleast one number</label>
                </div>
                <div>
                  <label className='check' style={{color:criteria[3]?'rgb(0, 255, 0)':'rgb(255, 21, 0)'}}>{criteria[3]?<>&#x2713;</>:'!'}</label>
                  <label>Atleast one special character</label>
                </div>
                <div>
                  <label className='check' style={{color:criteria[4]?'rgb(0, 255, 0)':'rgb(255, 21, 0)'}}>{criteria[4]?<>&#x2713;</>:'!'}</label>
                  <label>Password length should be minimum of 8 characters and maximum of 15 characters</label>
                </div>
            </div>


            <div className='resetinputs'>
                <label>Confirm Password</label>
                <div>
                {
                    password[3]?
                    <input type='text'  id='passtext2' placeholder='enter your password'  required/>
                    :
                    <input type='password'  id='pass2' placeholder='enter your password'  required/>

                  }                
                  <FontAwesomeIcon icon={faEye} className='eye' onClick={()=>handlePassword(3)}/>
                  {
                    password[3]?
                    ''
                    :
                    <label className='strike' onClick={()=>handlePassword(3)}></label>
                  }
                </div>
                <div>
                {
                    passtest?
                    <label className='errorpass'>
                        {criteria[0] && criteria[1] && criteria[2] && criteria[3] && criteria[4]?'Password dosen\'t match':'password need to met the required criteria'}
                      </label>
                    :
                    ''
                }
                </div>
            </div>
            {
              status===null?
                <button className='resetbtn'  type='submit'>Reset</button>

              :
              <span className='loading'>
                <label className='wave1 wave'></label>
                <label className='wave2 wave'></label>
                <label className='wave3 wave'></label>
                <label className='wave4 wave'></label>
              </span>

            }
          </form>
        }
    </div>
  );
}

export default Reset;
