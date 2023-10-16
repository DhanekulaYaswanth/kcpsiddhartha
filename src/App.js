import React, {useState} from 'react';
import { HashRouter, Routes,Route, Outlet } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Result from './Pages/Result/Result';
import Reset from './Pages/Reset/Reset';

function App() {

  const [response,setresponse] = useState([]);


  return (
    <div className="App">
        <HashRouter>
            <Routes>
                <Route path='/' element={<Login response={response} setresponse={setresponse}/>}/>
                    <Route path='/resetpassword' element={<Reset response={response}/>}/> 
                    <Route path='/results' element={<Result response={response} setresponse={setresponse}/>}/>
            </Routes>
        </HashRouter>

        <Outlet/>
    </div>
  );
}

export default App;
