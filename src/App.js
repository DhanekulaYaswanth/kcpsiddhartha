import React, {useState} from 'react';
import { HashRouter, Routes,Route, Link, BrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Result from './Pages/Result/Result';

function App() {

  const [response,setresponse] = useState([]);


  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login response={response} setresponse={setresponse}/>}/>
                    <Route index path='/results' element={<Result response={response} setresponse={setresponse}/>}/>
            </Routes>
        </BrowserRouter>

        <Outlet/>
    </div>
  );
}

export default App;
