import React from 'react'
import laptop from "../assets/images/portfolio_laptop.png"
import self from "../assets/images/portfolio_self.png"
import bg from "../assets/images/bg.png"
import Navbar from './NavBar'
import "../styles.css"

function Header() {
  return (
   <>
   <div id='home' style={{backgroundImage: `url(${bg})`}} className=' bg-center bg-cover bg-no-repeat h-screen flex flex-col '>
    <Navbar/>
    <div className="wrapper flex justify-between items-center h-screen w-full px-20">
      <div className="image banner-laptop w-[300px]">
        <img className='w-96 ast-img' src={laptop} alt="" />
      </div>
      <div className="content lg:text-center">
        <h1 className='text-white text-5xl font-bold'>Hello, I am Gary Liang</h1>
        <p className='text-white py-4 max-w-lg '>Software Developer</p>
        {/* <button className='  text-white text-2xl'>Let's Connect <i className="fa-solid fa-arrow-right text-lg  p-[2px] "></i> </button> */}
      </div>
      <div className="image banner-self w-[300px]">
     
        <img className='w-96 ast-img' src={self} alt="" />
      </div>
   
    </div>
   </div>
   </>
  )
}

export default Header