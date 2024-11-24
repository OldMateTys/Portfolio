import './App.css';
import React, { useState } from 'react';
import data from './data.json';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>

  );
}


function Header() {

  const navigate = useNavigate();

  function handleNavigation(i) {
    if (i === 0) navigate("/");
    if (i === 1) navigate("/projects");
    if (i === 2) navigate("/about");
    if (i === 3) navigate("/contact");
  }

  return (
    <div className="header" >
      <h1 className='logo'>Tyson Jelicich | Software Developer</h1>
      <div className='nav'>
        <button type='button' className='button' onClick={() => handleNavigation(0)}>Home</button>
        <button type='button' className='button' onClick={() => handleNavigation(1)}>Projects</button>
        <button type='button' className='button' onClick={() => handleNavigation(2)}>About</button>
        <button type='button' className='button' onClick={() => handleNavigation(3)}>Contact</button>
      </div>
    </div>
  );
}


function Projects() {

  const [jsonData, setJsonData] = useState(data);

  function Tile({i, onClick}) {
    const projectHeading = jsonData[i].title;
    const prjDescription = jsonData[i].description;
    const projectImage = jsonData[i].image;
    const projectLink = jsonData[i].link;

    const imagePath = projectImage ? require(`./resources/${projectImage}`) : null;

    return (
      <div className='tile' onClick={onClick}>
        <div className='imageContainer'>
          <img src={imagePath} alt="Stock chart" className='tileImage' />
        </div>
        
        <div className='tileTextBox'>
          <div className='p tileTitle'>{projectHeading}</div>
          <div className='p tileText'>{prjDescription}</div>
        </div>

      </div>
    );

  }

  function handleClick(i) {
    const link = jsonData[i].link;

    if (link) window.open(link , "_blank");
  }


  return (
    <div className='main'>
      <div className='block'>
        <h1 className='p title'>Projects</h1>
        <hr />
        <div className='tileContainer'>
          <Tile i={0} onClick={() => handleClick(0)} />
          <Tile i={1} onClick={() => handleClick(1)} />
          
        </div>
      </div>
    </div>
  );
  
}

function Home() {
  return (
    <div className='main'>
      <p className='p'>hello</p>
    </div>
  );
}

function About() {
  return (
    <div className='main'>

    </div>
  );
}

function Contact() {
  return (
    <div className='main'>

    </div>
  );
}

export default App;
