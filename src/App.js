import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import data from './data.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [jsonInfo, setJsonInfo] = useState(data);

  return (
  <>
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </>  
  );
}


function Header() {

  const navigate = useNavigate();

  function handleNavigation(i) {
    if (i == 0) navigate("/");
    if (i == 1) navigate("/projects");
    if (i == 2) navigate("/about");
    if (i == 3) navigate("/contact");
  }
  return (
    <>
      <div className='logo'>Tyson Jelicich | Software Developer</div>
      <div className='nav'>
        <button type='button' className='button' onClick={() => handleNavigation(0)}>Home</button>
        <button type='button' className='button' onClick={() => handleNavigation(1)}>Projects</button>
        <button type='button' className='button' onClick={() => handleNavigation(2)}>About</button>
        <button type='button' className='button' onClick={() => handleNavigation(3)}>Contact</button>
      </div>
    </>
  );
}


function Projects() {
  return (
    <>
      <Header className='header' />
      <Body className='body' />
    </>
  );
}

function Home() {

}

function About() {}

function Contact() {}

function MockStock() {}

export default App;
