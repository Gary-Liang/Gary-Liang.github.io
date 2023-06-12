import React, {useEffect, useState, useRef, useCallback } from 'react'
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import BackgroundImage from './images/light-black.png'

export default function App() {
  const [isLoadedFirst, setIsLoadedFirst] = useState(true);
  const [startIntroRender, setStartIntroRender] = useState(false);
  const ref = useRef(null);
  
  console.log("initial call: " + ref);

  useEffect(() => {
    if (ref.current) {
      console.log("app ref: " + ref);
      console.log("app ref current: " + ref.current);
      ref.current.focus();
      setStartIntroRender(true);
    }
  }, [ref, setStartIntroRender]);

  return (
    <div className="App" ref={ref}>
       <Intro ref={ref}/>
       <img className="canvas" src={BackgroundImage} alt=""></img>
    </div>
  );
} 


