import React, { useEffect, useState } from "react";
import './Result.css';
import { useNavigate} from "react-router-dom";



document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
  if (e.ctrlKey && e.key === 'u') {
    alert("ctrl + u disable");
    return false;
  }
};



function Result(props){
    const {response,setresponse} = props;
    const navigate = useNavigate(); // Access the navigate function
    const [result,setresult] = useState(response.results || [])


    useEffect(()=>{
        if(response.length===0){
            navigate('/'); // Redirect if status is true
        }
    },[response])


    useEffect(()=>{
            document.title = 'Student Result-KCPSARP'; // Set your desired title here
      },)



    const subjects = {
        '4': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3(30)', 'maths':'Maths', 'science':'Science', 'computer':'Computer (30)', 'gk':'GK (30)'},

        '5': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3(30)', 'maths':'Maths', 'science':'Science', 'computer':'Computer (30)', 'gk':'GK (30)'},

        '6': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3(30)', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'AI / Comp_Science (30)', 'gk':'GK (30)'},

        '7': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3(30)', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'AI / Comp_Science (30)', 'gk':'GK (30)'},

        '8': {'english':'English', 'lang2':'Language 2', 'lang3':'Language 3(30)', 'maths':'Maths', 'science':'Science', 'social':'Social', 'computer':'AI / Comp_Science (30)', 'gk':'GK (30)'},

        '9': {'english':'English', 'lang2':'Language 2', 'maths':'Maths', 'science':'Science', 'social':'Social Science', 'computer':'Artificial Intelligence (30)'},

        '10': {'english':'English', 'lang2':'Language 2', 'maths':'Maths', 'science':'Science', 'social':'Social Science', 'computer':'Artificial Intelligence (50)'},

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
      




      useEffect(() => {
        const data = [...result];
    
        data.sort((a, b) => {
            const examnumberA = parseInt(a.examnumber);
            const examnumberB = parseInt(b.examnumber);
    
            return examnumberA - examnumberB;
        });

    
        setresult(data);
    }, []);
    
    
    

      



      var j=0;





    return(
        <div className="resultcontainer">
            {
                response.length!==0?
                <>

                    <img className="banner" src={require('./WhatsApp Image 2023-10-14 at 15.27.26_fd88cdf0.jpg')}/>
                    <div className="resultdiv">
                        <div className="studentdetails">
                            <h1 key={1000}>Sudent's Name : <label key={1005}>{response.user.stu_name}</label> </h1>
                            <h1  key={1003}>Admission Number : <label key={1008}>{response.user.admno}</label></h1>
                            <h1 key={1004}>Class : <label key={1009}>{response.user.class} ({
                                 response.user.class <= 9 ? response.user.class_sec.slice(1) :
                                  response.user.class_sec.slice(2)
                            })</label></h1>
                            {
                                response.user.mname?
                                <h1 key={1002}>Mother's Name : <label key={1007}>{response.user.mname}</label></h1>
                                :
                                ''
                            }
                            {
                                response.user.fname?
                                <h1 key={1001}>Father's Name : <label key={1006}>{response.user.fname}</label></h1>
                                :
                                ''
                            }
                            
                        </div>                        
                        <label className="resultcaption" key={1020}>RESULT</label>

                            <table className="result" cellPadding="15px" cellSpacing="1px">
                                <thead>
                                    <tr className="resultheadings" key={1010}>
                                        <th key='15155'>Exam Name</th>
                                        {thElements}
                                    </tr>
                                    {
                                        result.map((item)=>(
                                            <tr className="resultbody" key={j+100}>
                                                <th key={item.examname}>{
                                                    String(item.examname).toLowerCase()==='pd1'?<>PT - &#8544; (30)</>
                                                        :
                                                    String(item.examname).toLowerCase()==='pd2'?<>PT - &#8545; (30)</>
                                                        :
                                                    'HY Exam (80/70)'
                                                
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
                            {/* <a href={`https://kcpsarpschool.org/wp-content/uploads/2023/10/${response.user.admno}_pt1.pdf`} target="_blank">PD1_({response.user.admno}).pdf</a> */}
                            {/* <a href={`https://kcpsarpschool.org/wp-content/uploads/2023/10/${response.user.admno}_term_1.pdf`} target="_blank">TERM-I_({response.user.admno}).pdf</a> */}
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