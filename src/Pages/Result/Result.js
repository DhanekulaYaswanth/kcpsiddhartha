import React, { useEffect, useState } from "react";
import './Result.css';
import { useNavigate} from "react-router-dom";


function Result(props){
    const {response,setresponse} = props;
    const navigate = useNavigate(); // Access the navigate function
    const [result,setresult] = useState(response.results || [])


    useEffect(()=>{
        if(response.length===0){
            navigate('/'); // Redirect if status is true
        }
    },[response])




    const subjects = {
        '4': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'computer':'Computer', 'gk':'GK (60)'},

        '5': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'computer':'Computer', 'gk':'GK (60)'},

        '6': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'Computer', 'gk':'GK (60)'},

        '7': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'Computer', 'gk':'GK (60)'},

        '8': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'Computer', 'gk':'GK (60)'},

        '9': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'Computer'},

        '10': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'Computer'},

        '11': {
            'MPC':{
                    'english':'English Core', 
                    'physics':'Physics',
                    'chemistry':'Chemistry',
                    'maths':'Mathematics',
                    'computer':'Computer Science'
                
                },
            'MEC':{
                    'english':'English Core',
                    'accounts':'Accountancy',
                    'bus_studies':'Bussiness Studies',
                    'economics':'Economics',
                    'maths':'Mathematics',
                },
            'BIPC':{
                    'english':'English Core',
                    'physics':'Physics',
                    'chemistry':'Chemistry',
                    'biology':'Biology',
                    'computer':'Computer Science'
                },
            'CEC':{
                    'english':'English Core',
                    'accounts':'Accountancy',
                    'bus_studies':'BUSINESS STUDIES',
                    'economics':'Economics',
                    'computer':'Computer Science'
                }
        },

        '12': {
            'MPC':{
                    'english':'English Core', 
                    'physics':'Physics',
                    'chemistry':'Chemistry',
                    'maths':'Mathematics',
                    'computer':'Computer Science'
                
                },
            'MEC':{
                    'english':'English Core',
                    'accounts':'Accountancy',
                    'bus_studies':'Bussiness Studies',
                    'economics':'Economics',
                    'maths':'Mathematics',
                },
            'BIPC':{
                    'english':'English Core',
                    'physics':'Physics',
                    'chemistry':'Chemistry',
                    'biology':'Biology',
                    'computer':'Computer Science'
                },
            'CEC':{
                    'english':'English Core',
                    'accounts':'Accountancy',
                    'bus_studies':'BUSINESS STUDIES',
                    'economics':'Economics',
                    'computer':'Computer Science'
                }
            }
      };


      const thElements = [];
      const subjectnames = [];


      if(result.length!==0 && (String(response.user.class)!==String(11) && String(response.user.class)!==String(12))){
        const classSubjects = subjects[response.user.class];

        for (const [key, value] of Object.entries(classSubjects)) {
            thElements.push(<th key={key}>{value}</th>);
            subjectnames.push(key)
        }

      }else if (result.length !== 0 && (response.user.class === "11" || response.user.class === "12")) {
        const classSubjects = subjects[response.user.class][response.user.class_sec.slice(2)]; // Get subjects for the specific stream
      
        for (const [key, value] of Object.entries(classSubjects)) {
          thElements.push(<th key={key}>{value}</th>);
          subjectnames.push(key);
        }
      }
      



      var j=0;


      console.log(result,response)




    return(
        <div className="resultcontainer">
            {
                response.length!==0?
                <>

                    <img className="banner" src={require('./WhatsApp Image 2023-10-14 at 15.27.26_fd88cdf0.jpg')}/>
                    <div className="resultdiv">
                        <div className="studentdetails">
                            <h1 key={1000}>Sudent's Name : <label key={1005}>{response.user.stu_name}</label> </h1>
                            <h1 key={1001}>Father's Name : <label key={1006}>{response.user.fname}</label></h1>
                            <h1 key={1002}>Mother's Name : <label key={1007}>{response.user.mname}</label></h1>
                            <h1  key={1003}>Admission Number : <label key={1008}>{response.user.admno}</label></h1>
                            <h1 key={1004}>Class : <label key={1009}>{response.user.class_sec}</label></h1>
                        </div>                        
                        <label className="resultcaption" key={1020}>RESULTS</label>
        
                        {/* <table className="result" cellPadding="15px" cellSpacing="1px">
                            <thead>
                                <tr className="resultheadings">
                                    <th>ExamName</th>
                                    <th>English</th>
                                    <th>Language 2</th>
                                    <th>Language 3</th>
                                    <th>Maths</th>
                                    <th>Science</th>
                                    <th>Social</th>
                                    <th>Computers</th>
                                    <th>GK (60)</th>
                                </tr>
                            </thead>
                            
                            <thead >
                               <tr className="resultbody">
                                    <th>PT1 (30)</th>
                                    <td>{result[0].english}</td>
                                    <td>{result[0].lang2}</td>
                                    <td>{result[0].lang3===''?'-':result.lang3}</td>
                                    <td>{result[0].maths}</td>
                                    <td>{result[0].science}</td>
                                    <td>{result[0].social}</td>
                                    <td>{result[0].computer===''?'-':result.computer}</td>
                                    <td>{result[0].gk===''?'-':result.gk}</td>
                                </tr>
                            </thead >
                            <thead>
                                <tr className="resultbody">
                                    <th>Term 1 (100)</th>
                                    <td>{result[1].english}</td>
                                    <td>{result[1].lang2}</td>
                                    <td>{result[1].lang3}</td>
                                    <td>{result[1].maths}</td>
                                    <td>{result[1].science}</td>
                                    <td>{result[1].social}</td>
                                    <td>{result[1].computer}</td>
                                    <td>{result[1].gk}</td>
                                </tr>
                            </thead>
                        </table> */}

                            <table className="result" cellPadding="15px" cellSpacing="1px">
                                <thead>
                                    <tr className="resultheadings" key={1010}>
                                        <th key='15155'>Exam Name</th>
                                        {thElements}
                                    </tr>
                                
                                    {
                                        result.map((item)=>(
                                            <tr className="resultbody">
                                                <th key={item.examname}>{
                                                    item.examname==='PD1'?'PT 1 (30)'
                                                        :
                                                    item.examname==='Half Yearly'?'Term 1 (100)':''
                                                }</th>
                                                {
                                                    subjectnames.map((i)=>{
                                                        j+=1
                                                        return(
                                                            <td key={j}>{item[i]===''?'-':item[i]}</td>
                                                        )
                                                        
                                                    })
                                                }
                                            </tr>
                                        ))
                                    }
                                </thead>                            
                            </table>
                            
                    
        
        
                        <div className="buttons">
                            <a href={`https://kcpsarpschool.org/wp-content/uploads/2023/10/${response.user.admno}_pt1.pdf`} target="_blank">PD1_({response.user.admno}).pdf</a>
                            <a href={`https://kcpsarpschool.org/wp-content/uploads/2023/10/${response.user.admno}.pdf`} target="_blank">HalfYearly_({response.user.admno}).pdf</a>
                        </div>






                        
                    </div>
                
                </>
                :
                ''
            }   
        </div>
    )
}




export default Result;