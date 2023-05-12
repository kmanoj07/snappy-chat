import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages//Login'
import Chat from './pages/Chat'
import SetAvataar from './pages/SetAvataar';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/register' element= {<Register/>} />
          <Route path='/login' element= {<Login/> } />
          <Route path='/setAvataar' element={<SetAvataar/>}/>
          <Route path='/' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
