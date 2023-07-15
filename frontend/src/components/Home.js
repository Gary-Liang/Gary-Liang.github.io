import React from 'react'
import Header from "./Header"
import Contact from "./Contact"
import Footer from "./Footer"
import Projects from "./Projects"
import Skills from "./Skills"

export default function Home() {
  return (
    <>
     <Header/> 
     <Skills/> 
     <Projects/>
     <Contact/>
     <Footer/>
    </>
  );
}
