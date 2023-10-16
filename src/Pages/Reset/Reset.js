import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import './Reset.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Reset(props) {

  const {response} = props;

  const [password,setPassword] = useState([false,false]);

  const [criteria,setcriteria] = useState(['','','','',''])

  const [passtest,setPassTest] = useState([null,null]);


  const [status,setstatus] = useState(null);

  const handlePassword = (e) =>{
    if(e>1){
      const data = [...password];
      data[e]=!data[e]
      setPassword(data);
      document.getElementById('')
    }
  }


  const handleChecks = (e) => {
    const newPassword = e.target.value;
    var data = [...criteria]
    data[0] = /[a-z]/.test(newPassword); //checks small 
    data[1] = /[A-Z]/.test(newPassword); //checks capital
    data[2] = /\d/.test(newPassword); //checks for digits
    data[3] = /[@$!%*?&]/.test(newPassword); //checks for special characters
    data[4] = newPassword.length>=8; //checks for length


    var t = [...passtest];

    t[1] = data[0] && data[1] && data[2] && data[3] && data[4];

    setPassTest(t);
    setcriteria(data)
  };


  const checkPassword = (e) =>{
      var pass1 = document.getElementById('passtext1') || document.getElementById('pass1');
      var t = [...passtest];
      if(e.target.value!==pass1.value){
        t[0] = false
      }else{
        t[0] = true;
      }
      setPassTest(t);
  }



  const handleSubmit = (e) =>{
    e.preventDefault();
    const pass1 = document.getElementById('passtext1') || document.getElementById('pass1');
    const pass2 = document.getElementById('passtext2') || document.getElementById('pass2');
    if(passtest[0] && passtest[1]){
      axios.post('https://kcpsiddhartha.vercel.app/resetpass',{'id':response.user.admno,'password':pass1.value})
      .then((res)=>{
        setstatus(res.data.status)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }


  console.log(status)




  return (
    <div className="resetcontainer">
        {
          status?
          <div className='resetsuccesfull'>
              <label>Password Reset Succesfull!</label>
              <label>Click here to <Link to='/'>Login</Link> to see the result</label>
          </div>
          :
          <form className='resetform' onSubmit={handleSubmit}>
            <h1 className='resettitle'>Reset Password</h1>
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
                  <label>Password length should be minimum of 8 characters</label>
                </div>
            </div>


            <div className='resetinputs'>
                <label>Confirm Password</label>
                <div>
                {
                    password[3]?
                    <input type='text'  id='passtext2' placeholder='enter your password' onChange={checkPassword} required/>
                    :
                    <input type='password'  id='pass2' placeholder='enter your password' onChange={checkPassword} required/>

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
                    !passtest[0] && passtest[0]!==null?
                    <label className='errorpass'>Password dosen't match</label>
                    :
                    ''
                }
                </div>
            </div>
            {
              status===null?
                <button className='resetbtn' style={{backgroundColor:(passtest[0] && passtest[1])?'':'gray'}}  type='submit'>Reset</button>

              :
              <div className='loading'>
                <label className='wave1'></label>
                <label className='wave2'></label>
                <label className='wave3'></label>
                <label className='wave4'></label>
              </div>

            }
          </form>
        }
    </div>
  );
}

export default Reset;
