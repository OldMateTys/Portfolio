import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import data from './data.json';
import { useForm, ValidationError } from '@formspree/react';



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
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <About aboutRef={aboutRef} />
          <Projects projectsRef={projectsRef} />
          <Contact contactRef={contactRef} />
          <br></br><br></br><br></br>
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
  const [zoom, setZoom] = useState(1);

  function handleZoomChange(e) {
    setZoom(Number(e.target.value));
  }

  function Tile({i, onClick}) {
    const projectHeading = jsonData[i].title;
    const prjDescription = jsonData[i].description;
    const projectImage = jsonData[i].image;

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
        <div className='headingContainer'>
          <div className='p heading' ref={projectsRef}>Projects</div>
      
          <div className='tileContainer'>
            <Tile i={0} onClick={() => handleClick(0)} />
            <Tile i={1} onClick={() => handleClick(1)} />
            
          </div>
        </div>
      </div>
    </div>
  );
  
}

function About({aboutRef}) {

  const [ isOn, setIsOn ] = useState(true);
  const [ isFading, setIsFading ] = useState(false);
  const [ textBool, setTextBool] = useState(true);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState('auto');

  const toggleState = () => {
    setIsFading(true);
    setIsOn(!isOn);
    setTimeout(() => {
      
      setIsFading(false);
      setTextBool(!textBool);
    }, 300);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [textBool]);

  return (
    <div className='main'>
      <div className='block'>
        <div className='title_box'>
          <div className='p heading' ref={aboutRef}>About</div>
          <div className='sliding-bar-container' onClick={toggleState}>
            <div className={`sliding-bar ${isOn ? 'active' : 'inactive'}`}></div>
            <div className='labelContainer'>
              <p className='label label1'>Overview</p>
              <p className='label label2'>TL;DR</p>
            </div>
          </div>
        </div>
      <br />
        <div 
          className={`content-wrapper ${isFading ? 'fade-out' : ''}`}
          style={{height: contentHeight}}>
          <div ref={contentRef}>{textBool ? aboutMe : tldr}</div>
          
        </div>
      </div>    
    </div>
  );
}

function Contact({contactRef}) {
  return (
    <div className='main'>
        <div className='block'>
          <div className='headingContainer'>
          <div className='p heading' ref={contactRef}>Contact</div>
          </div>
          <div className='aboutText'>
            <br></br>
            Shoot me a message below if you wish to get in touch. Cheers!
            <br></br><br></br><br></br>
          </div>
          <ContactForm />
        </div>
    </div>
  );
}

function ContactForm() {
  const [state, handleSubmit] = useForm("myzynzwo");
  if (state.submitting) {
    return (
      <div className='bold'>Submitting...</div>
    );
  }
  if (state.succeeded) {
      return <p className='bold'>Received! Thanks for reaching out! I'll be in touch soon.</p>;
  }
  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='contactBox'>
      <div className='prompt-box'>
      <label htmlFor="email" className='bold'>
        Email Address:&nbsp;&nbsp;
      </label>
      <textarea
        id="email"
        name="email"
        className='emailInput'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      </div>
      <div className='prompt-box'>
        <div>
      <label htmlFor="email" className='bold'>
        Message:&nbsp;&nbsp;
      </label>
      </div>
      <div>
      <textarea
        id="message"
        name="message"
        
      />
      
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      </div>
      </div>
      <div className='submitButtonBox'>
      <button type="submit" disabled={state.submitting} className='submitButton'>
        Submit
      </button>
      </div>
      </div>
    </form>
  );
}

const tldr = (
  <div className='aboutText'>
<div className='bold'>Goal:</div>
  <ul>
    <li>Obtaining gainful employment as a low-latency developer optimising performance-critical software.</li>
  </ul>
<div className='bold'>Focus:</div>
<ul>
<li>Aspiring low-latency developer building performance-critical systems.</li>
<li>Pursuing a BSc in Computer Science (High Distinction).</li>
<li>Proficient in Python, Java, JavaScript, React, HTML/CSS, C++.</li>
<li>Actively developing an algorithmic trading platform for HFT simulation.</li>
<li>Learning C++ to master low-level, high-performance programming.</li>
</ul>

<div className='bold'>Finance Background:</div>
<ul>
  <li>Accredited Investment Finance Broker with a BCom in Finance.</li>
  <li>Comfortable and performant in high-pressure, high-stakes situations.</li>
  <li>Experienced in client relationship management.</li>
  <li>Heavily involved in the creation and implementation of new technologies:</li>
  <ul>
    <li>Integrated HubSpot CRM for workflow efficiency and compliance tracking.</li>
    <li>Built a data management system to minimise double handling data entry.</li>
    <li>Created a ChatGPT wrapper to automatically generate submission & compliance documents from stored data, reducing application creation from 3 hours to 30 minutes.</li>
    <li>Developed tools to passively track client equity growth for reinvestment opportunities.</li>
  </ul>
</ul>
<div className='bold'>Projects:</div>
<ul>
  <li>Building an algorithmic trading platform combining full-stack and C++.</li>
  <li>Created a portfolio website to refine front-end skills.</li>
</ul>
<div className='bold'>Lifestyle:</div>
<ul>
  <li>Balances work, study, surfing, and self-improvement daily.</li>
</ul>

  </div>
);
const aboutMe = (
  <div className='aboutText'>

I'm a budding developer who loves tackling challenging problems and building efficient, 
high-performance systems. After taking a detour from my role as an Investment Finance Broker, 
I've become enamoured with programming and technical creative outlets. I'm particularly 
fascinated by the intricacies of low-latency systems and high-performance programming, and 
I'm currently learning as much as I can in this area. My goal is to deepen my understanding 
while creating useful tools that enrich those around me.
<br></br><br></br>
I'm proficient in Python, Java, JavaScript, React, HTML, CSS, and C++. To expand my knowledge, 
I'm studying a Bachelor of Science in Computer Science at the University of Sydney, where have
performed well. I also hold a Bachelor of Commerce in 
Finance from Macquarie University, which, combined with my technical skills, allows me to approach 
challenges in algorithmic trading, distributed systems, and performance-critical software 
from multiple perspectives.
<p className='bold'>Professional Experience:</p>

My time in finance has given me a strong suite of client management skills and the ability to 
perform under high-stress scenarios. A significant part of my role involved aiding the firm's 
integration of new technologies and making tools intuitive and appealing for widespread adoption 
with minimal friction. During my time there, I implemented HubSpot as a new CRM, creating the 
finance deal pipeline to track deals for both efficiency and compliance purposes.
<br></br><br></br>

I also created multiple tools to streamline processes:
<ul>
<li>Custom Data Storage System: Provided a one-stop shop for data entry, replacing the need for 
brokers to enter data into multiple places (CRM, compliance, loan notes). I implemented a 
ChatGPT wrapper that took the data in the system and automatically outputted a full suite of 
documentation: loan submission notes, compliance documentation, and formatted CSVs for easy 
importing into the CRM. This reduced the time taken to create a new application from approximately 
3 hours to 30 minutes.</li>
<li>
Portfolio Modelling Program: Scans the firm's trail book—a record of loans we've written, paid
on a monthly basis over the life of the loan—and provides an easy way to view the growth in equity 
of client portfolios. This allows the firm to more easily identify when clients may be ready to invest 
with us again.</li>
</ul>
<p className='bold'>Side Projects:</p>
<ul>
<li>
Portfolio Website: Created a personal portfolio website to gain a deeper understanding of front-end development.
</li>
</ul>

<p className='bold'>Current Endeavours:</p>

I'm currently working on my first significant project: building an algorithmic trading platform. My 
goal is to learn how to combine front-end and back-end development, alongside learning low-level 
languages (predominantly C++) to create value through high-frequency trading (HFT) simulation.

<p className='bold'>Long-Term Goals:</p>

I aspire to work as a low-latency developer, creating value by optimising performance-critical systems. 
The problem-solving aspects, mathematical and statistical involvement, and the requirement for 
incredibly deep understanding have drawn me to this area.

<p className='bold'>Work-Life Balance:</p>
I currently work part-time (3-4 days during uni, full-time otherwise) and try to surf 3-4 times a 
week or swim laps when the surf isn't good or the water's too cold. I spend about 2 hours a day 
expanding my skillset, whether that's working on projects or self-study through books related to my 
field or coursework. Recent examples include C++ Primer and Effective Modern C++, which I'm using to 
build a strong, ground-up understanding of low-level languages.
  </div>
);

export default App;
