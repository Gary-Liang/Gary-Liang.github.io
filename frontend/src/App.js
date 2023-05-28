import React, {useEffect, useState, useRef } from 'react'
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';

export default function App() {
  const [isLoadedFirst, setIsLoadedFirst] = useState(true);
  const ref = useRef(null);
  



  return (
    <div className="App">
      <Intro ref={ref}/>
    </div>
  );
} 


