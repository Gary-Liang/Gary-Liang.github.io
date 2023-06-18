import React, {useEffect, useState, useRef, useCallback } from 'react'
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import BackgroundImage from './images/light-black.png'

export default function App() {
  const [isLoadedFirst, setIsLoadedFirst] = useState(true);
  const [startIntroRender, setStartIntroRender] = useState(false);
  const ref = useRef(null);
  
  console.log("initial call: " + ref.current);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      setStartIntroRender(true);
    }
  }, [ref, setStartIntroRender]);

  return (
    <div className="App" ref={ref}>
       <Intro ref={ref}/>
       <div id="canvas">
          <img id="image" src={BackgroundImage} alt=""></img>
       </div>
    </div>
  );
} 


