import React, { useEffect, useState } from "react";
import './Result.css';
import { useNavigate} from "react-router-dom";


function Result(props){
    const {response,setresponse} = props;
    const navigate = useNavigate(); // Access the navigate function
    const [result,setresult] = useState(response.results)


    useEffect(()=>{
        if(response.length===0){
            navigate('/'); // Redirect if status is true
        }
    },[response])


    console.log(response)

    return(
        <div className="resultcontainer">
            {
                response.length!==0?
                <>

                    <img className="banner" src={require('./WhatsApp Image 2023-10-14 at 15.27.26_fd88cdf0.jpg')}/>
                    <div className="resultdiv">
                        <div className="studentdetails">
                            <h1>Sudent's Name: <label>{response.user.stu_name}</label> </h1>
                            <h1>Father's Name: <label>{response.user.fname}</label></h1>
                            <h1>Mother's Name: <label>{response.user.mname}</label></h1>
                            <h1>Admission Number: <label>{response.user.admno}</label></h1>
                        </div>                        
                        <label className="resultcaption">RESULTS</label>
        
                        <table className="result" cellPadding="15px" cellSpacing="1px">
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