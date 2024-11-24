import './App.css';
import React, { useState, useEffect } from 'react';
import data from './data.json';
import { useNavigate } from 'react-router-dom';



function App() {



  return (
    <div className='site custom-scroll'>
        <Header />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <About />
          <Projects />
          <Contact />
        </div>
    </div>

  );
}


function Header() {

  return (
    <div className="header" >
      <h1 className={`logo`}>Tyson Jelicich</h1>
      <p className='title'>Back-end Engineer</p>
      <div className='nav'>
        <button type='button' className='button p1'>About</button>
        <button type='button' className='button p1'>Projects</button>
        <button type='button' className='button p1'>Contact</button>
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
        <h1 className='p heading'>Projects</h1>
        <div className='tileContainer'>
          <Tile i={0} onClick={() => handleClick(0)} />
          <Tile i={1} onClick={() => handleClick(1)} />
          
        </div>
      </div>
    </div>
  );
  
}

function About() {
  return (
    <div className='main'>
      <div className='block'>
      <div className='p heading'>About</div>
      <br />
      <div className='aboutText'>I am a developer passionate about solving complex problems through thoughtful, high-performance engineering. My current focus lies in transitioning to a career in software development, with a deep interest in low-latency systems and the underlying architectures that power them. My goal is to design and build robust, scalable solutions that combine technical excellence with real-world impact.<br /> <br/>
Currently, I am pursuing a Bachelor of Science in Computer Science at the University of Sydney, where I maintain a High Distinction average (86 WAM). I also hold a Bachelor of Commerce in Finance from Macquarie University, which complements my technical skills with a strong foundation in financial principles. My combined expertise uniquely positions me to tackle challenges in algorithmic trading, distributed systems, and performance-critical software.</div>
      </div>    
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
