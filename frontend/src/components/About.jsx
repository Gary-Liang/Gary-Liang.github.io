import React from "react";
import bg from "../assets/images/banner-bg.png"

function About() {
  return (
    <>
      <div id="about" style={{backgroundImage: `url(${bg})`}} className="wrapper h-full bg-no-repeat bg-top bg-cover p-16 lg:p-4">
        <div className="skills-wrapper text-center text-white bg-[#171717]  p-10 rounded-[50px] lg:p-2">
            <h1 className="text-4xl ">About</h1>
            <p className="text-lg py-3">
            I'm Gary Liang, and I'm passionate about software and technology. I've worked in quality assurance (QA) and DevOps, and now I'm excited to dive into the world of software engineering.
            While I've enjoyed QA and DevOps, I'm aiming to become a Software Engineer. I want to create software that's not only functional but also blends well with the big picture. I'm learning coding, algorithms, and more to make this transition.
            I love learning and adapting in tech's ever-changing landscape. I enjoy solving problems and working with diverse teams. Outside of work, I explore coding challenges.
            </p>
        </div>  
      </div>
    </>
  );
}

export default About;
