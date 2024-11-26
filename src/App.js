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
        <div className='headingContainer'>
          <h1 className='p heading' ref={projectsRef}>Projects</h1>
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

  const toggleState = () => {
    setIsOn(!isOn);
  }
  const overview = (
    <div className='aboutText'>
      I am a budding developer who has recently become enamoured with programming,
      taking a detour from my current role as an Investment Finance Broker towards more technical 
      creative outlets. I have discovered a deep fascination with low-latency systems and performant 
      programming, and am currently learning as much as I can in this area. Through this learning 
      process I aim to create useful tools the enrich those around me.
      <br></br><br></br>
      To this end I am studying a Bachelor of Science in Computer Science at the University of Sydney, 
      performing with High Distinction, whilst engaging in personal projects and study to elevate my skillset.
      <br></br><br></br>
      I am currently working on my first decently-sized project, where I am building an algorithmic trading platform, 
      with the goal of learning how to combine Front-End and Back-End development, alongside learning low-level languages 
      (predominantly C++) to create value through HFT simulation.
      <br></br><br></br>
      Outside of my studies I work in a part-to-full time capacity writing
      loans for clients, helping local investors understand and implement wealth generation strategies. 
      <br></br><br></br>
      If you're interested in collaborating on a project or just want to have a chat, feel free to get 
      in touch—I'm always keen to connect with like-minded people!
    </div>
  );

  const tempStory = (
    <div className='invisText'>Coming soon... Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...Coming soon...                                                              
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
  );

  const story = (
    <div className='aboutText'>
      This is the tale of the one they call Tyson.
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
      Anyway, thanks for reading, and if you made it this far, please reflect on your sanity. One can only stand so much inane drivel. 
      <br></br><br></br>
      <p className='it'>
      If you're interested in collaborating on a project or just want to have a chat, feel free to get 
      in touch—I'm always keen to connect with like-minded people!
      </p>
      
    </div>
  );

  return (
    <div className='main'>
      <div className='block'>
      <div className='title_box'>
        <div className='p heading' ref={aboutRef}>About</div>
        <div className='sliding-bar-container' onClick={toggleState}>
          <div className={`sliding-bar ${isOn ? 'active' : 'inactive'}`}></div>
          <div className='labelContainer'>
            <p className='label label1'>Overview</p>
            <p className='label label2'>Story</p>
          </div>
        </div>
      </div>
      <br />
      {isOn ? aboutMe : story}
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
        </div>
    </div>
  );
}

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
)
export default App;
