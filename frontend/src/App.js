import React, {useEffect, useState, useRef, useCallback } from 'react'
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import Home from './components/Home';

export default function App() {
  const [isLoadedFirst, setIsLoadedFirst] = useState(true);
  const [startIntroRender, setStartIntroRender] = useState(false);
  const [glitchRendered, setGlitchRendered] = useState(false);

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
      {!glitchRendered ? 
        <Intro setGlitchRendered={setGlitchRendered} ref={ref}/> :
        <Home />
      }
    </div>
  );
} 


