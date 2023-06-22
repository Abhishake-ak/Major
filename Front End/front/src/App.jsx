import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import "./App.css";
import Main from './Components/Main';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudenInfo from './Components/StudenInfo';
import Modal from './Components/Modal';
import Admin from './Components/Admin';

const App = () => {
  const [modalOpen, setModalopen] = useState(false);
  const [query, setquery] = useState("");

  return (
    <BrowserRouter>
      <div className='App'>
        {modalOpen && <Modal setModalOpen={setModalopen} ><Admin setModalOpen={setModalopen} /></Modal>}
        <Navbar setquery={setquery} setModalOpen={setModalopen} />


        <Routes>
          <Route path='/' element={<Main query={query} />} />
          <Route path='/student' element={<StudenInfo />} />


        </Routes>

      </div>
    </BrowserRouter>

  )
}

export default App