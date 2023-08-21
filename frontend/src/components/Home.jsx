import React from 'react'
import About from "./About"
import Header from "./Header"
import Contact from "./Contact"
import Footer from "./Footer"
import Projects from "./Projects"
import Skills from "./Skills"

function Home() {
  return (
    <>
     <Header/>
     <About/> 
     <Skills/> 
     <Projects/>
     <Contact/>
     <Footer/>
    </>
  )
}

export default Home