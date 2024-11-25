import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import data from './data.json';
import { useNavigate } from 'react-router-dom';
import cv from './resources/newspaper.svg';
import github from './resources/github.svg';
import linkedin from './resources/linkedin.svg';



function App() {

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (i) => {

    if (i == 0) {
      aboutRef.current.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start',     // Aligns About at the top of the viewport
      });
    } 
    else if (i == 1) {
      projectsRef.current.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start',     // Aligns About at the top of the viewport
      });
    } 
    else if (i == 2) {
      contactRef.current.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start',     // Aligns About at the top of the viewport
      });
    }
  }

  useEffect(() => {
    document.title = "Tyson's Portfolio";
  }, []);

  return (
    <>
    <div className='site custom-scroll'>
        <Header scrollToAbout={() => scrollTo(0)} scrollToProjects={() => scrollTo(1)} scrollToContact={() => scrollTo(2)}/>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <About aboutRef={aboutRef} />
          <Projects projectsRef={projectsRef} />
          <Contact contactRef={contactRef} />
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    </div>
    </>

  );
}


function RotatingCube() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame;

    const rotate = () => {
      setRotation((prev) => ({
        x: prev.x + 0.5, // Increment X-axis rotation
        y: prev.y + 0.5, // Increment Y-axis rotation
      }));
      animationFrame = requestAnimationFrame(rotate);
    };

    rotate(); // Start the animation

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, []);
  const faces = [
    { className: "front", char: "$" },
    { className: "back", char: "#" },
    { className: "left", char: "%" },
    { className: "right", char: "&" },
    { className: "top", char: "#" },
    { className: "bottom", char: "@" },
  ];
  return (
    <div className="container">
      <div
        className="cube"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, // Multi-axis rotation
        }}
      >
        {faces.map((face, index) => (
          <div className={`aboutText face ${face.className}`} key={index}>
            {Array.from({ length: 100 }).map((_, idx) => (
              <span key={idx}>{face.char}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


function Header({scrollToAbout, scrollToProjects, scrollToContact}) {


  return (
    <div className="header" >
      <h1 className={`logo`}>Tyson Jelicich</h1>
      <p className='title'>Back-end Engineer</p>
      <div className='nav'>
        <button type='button' className='button p1' onClick={scrollToAbout}>About</button>
        <button type='button' className='button p1' onClick={scrollToProjects}>Projects</button>
        <button type='button' className='button p1' onClick={scrollToContact}>Contact</button>
      </div>
      <RotatingCube />
      <Icons />
    </div>
  );
}

function Icons() {
  const cv = "newspaper.svg";
  const gh = "github.svg";
  const li = "linkedin.svg";
  const cvPath = cv ? require(`./resources/${cv}`) : null;
  const ghPath = gh ? require(`./resources/${gh}`) : null;
  const liPath = li ? require(`./resources/${li}`) : null

  function openLink(link) {
    if (link) window.open(link , "_blank");
  }

  return(
    <div className='iconContainer'>
      <img src={cvPath} className='icon' alt='CV' />
      <img src={ghPath} className='icon' alt='Github' onClick={() => openLink("https://github.com/OldMateTys/")}/>
      <img src={liPath} className='icon' alt='LinkedIn' onClick={() => openLink("https://www.linkedin.com/in/tyson-jelicich-a7ba32184/")}/>
    </div>
  );
}

function Projects({ projectsRef }) {

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
        <h1 className='p heading' ref={projectsRef}>Projects</h1>
        <div className='tileContainer'>
          <Tile i={0} onClick={() => handleClick(0)} />
          <Tile i={1} onClick={() => handleClick(1)} />
          
        </div>
      </div>
    </div>
  );
  
}

function About({aboutRef}) {
  return (
    <div className='main'>
      <div className='block'>
      <div className='p heading' ref={aboutRef}>About</div>
      <br />
      <div className='aboutText'>
      This, is Tyson.
      <br></br><br></br>
      He is, as his friends say, a person among people. This is not such a bad thing, 
      he thinks, as he believes in the inherent good in people. He is, unfortunately, wrong.
      <br></br><br></br>
      But that is not the reason you are here. Here being the little slice of the world that is Tyson, the 
      little part of the bigger picture that Tyson feels like he can control. Once again, mistaken.
      <br></br><br></br>
      If you asked him, Tyson would say "I'm a developer who loves tackling challenging problems and building efficient, 
      high-performance systems. I'm particularly fascinated by the intricacies of low-latency 
      systems and the architectures that make them possible.".
      <br></br><br></br>
      No really, he would. And in exactly that smarmy tone. 
      <br></br><br></br>
      It is, then, unsurprising that a part of Tyson shamefully aspires that developer. 
      <br></br><br></br>
      The respected one. The exalted one. Perhaps even the 10x one.
      <br></br><br></br>
      The one who devotes his life to optimising performance-critical systems, 
      where every once in a while, he will enter the office with a skip in his step, address his coworkers, 
      state "I did it" to then bathe in the adulations of the lesser beings with a stifled grin.
      <br></br><br></br>
      The kind of man who says "I couldn't have done it without my team" completely perfunctorily. The kind of man who has reached the top, but is immune to the subsequent ennui.
      <br></br><br></br>
      But, as with everything else, reality is far from daydreams. Tyson struggles to ignore that.
      <br></br><br></br>
      To date, one could well say that Tyson has done all the right things. He completed High School, 
      got accepted into a B.Comm. degree at the local university, then obtained full-time employment after graduating.   
      <br></br><br></br>
      He even enjoyed it. 
      <br></br><br></br>
      But yet, he felt like something was missing. A quiet but persistent part of him felt that there was more to life than writing loans.
      Even his natural talents at bottling things up wasn't enough. 
      <br></br><br></br>
      So, in a puzzling display of logic, he came to the conclusion that 17 years of study simply wasn't enough, and proceeded to hop into the ring once more.
      <br></br><br></br>
      <br></br><br></br>
      ...
      <br></br><br></br>
      <br></br><br></br>
      And now, I suppose, we are here. Today. 
      <br></br><br></br>
      Tyson is content. His marks are stellar, he is proud to be working hard and has been consistently getting around to starting and completing project ideas.
      <br></br><br></br>
      He says that he is working on the whole first-person perspective thing, but at this point I think it's beyond him.
      <br></br><br></br>
      I think he is spending too much time in the surf. We told him from the start that he should choose a lane and stay in it.
      <br></br><br></br>
      Anyway, thanks for reading, and if you made it this far, read further idk it's your life. 
      <br></br><br></br>
      <p className='it'>
      If you're interested in collaborating on a project or just want to have a chat, feel free to get 
      in touch—I'm always keen to connect with like-minded people!
      </p>
      
    </div>
      </div>    
    </div>
  );
}

function Contact({contactRef}) {
  return (
    <div className='main'>
        <div className='block'>
        <div className='p heading' ref={contactRef}>Contact</div>
        
        </div>
    </div>
  );
}

export default App;
