import React, {useEffect, useState, useRef, useCallback } from 'react'
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';

export default function App() {
  const [isLoadedFirst, setIsLoadedFirst] = useState(true);
  const appRef = useRef(null);
  
  console.log("initial call: " + appRef);

  useEffect(() => {
    if (appRef.current) {
      console.log(appRef.current);
      appRef.current.focus();
    }
  }, [appRef]);

  return (
    <div className="App" ref={appRef}>
      {appRef && appRef.current ? <Intro appRef={appRef}/> : null}
    </div>
  );
} 


