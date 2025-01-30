import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import {useState} from 'react';

const App = () => {
  const [sidebar, setSidebar]=useState(false);
  return (
    <div className='main'>
      <Navbar setSidebar={setSidebar} />
      <div className='sub'>
      <Routes>
        <Route path='/' element={<Home sidebar ={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={ <Video /> } />
      </Routes>
    </div>
    </div>
  );
}

export default App;