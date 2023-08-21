import React, { useState } from "react";
import trendingMemes from "../assets/images/trending-memes.png";
import portfolioSite from "../assets/images/portfolio-site.png";
import apiImage from "../assets/images/api.jpg";

import ProjectCard from "./ProjectCard";

function Projects() {
  const [durum, setDurum] = useState(1);

  const projects = [
    {
      id: 1,
      title: "Trending Memes",
      description: "Full stack project using Imgur API to pull 'trending memes' or what went viral",
      demo: "https://trendingmemes.org/",
      github: "https://github.com/Gary-Liang/trending-memes",
      img: trendingMemes,
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal Portfolio site that demonstrates my career development",
      demo: "Gary-Liang.github.io",
      github: "https://github.com/Gary-Liang/Gary-Liang.github.io",
      img: portfolioSite,
    },
    {
      id: 3,
      title: "API (Work in Progress)",
      description: "Currently working on an API",
      demo: "",
      github: "",
      img: apiImage,
    }
  ];

  return (
    <>
      <div id="projects" className="projects  bg-[#171717] text-white py-10">
        <h1 className="text-center text-4xl font-bold py-6">Projects</h1>
        <p className="text-center max-w-[1000px] lg:px-6 mx-auto text-[#939191]">
            Here is a list of my ongoing and completed projects:
        </p>
        <div className="flex justify-center items-center gap-4 mt-12 mb-2 ">
          {/* <button
            onClick={() => setDurum(1)}
            className={`font-bold text-[19px] border-2  bg-[#171717] rounded-[6px] p-[4px] ${
              durum == 1 ? "bg-[linear-gradient(90deg,#b004b0,#38097a)]" : ""
            }`}
          >
            Projects
          </button> */}
          {/* <button
            onClick={() => setDurum(2)}
            className={`font-bold text-[19px] border-2  bg-[#171717] rounded-[6px] p-[4px] ${
              durum === 2 ? "bg-[linear-gradient(90deg,#b004b0,#38097a)]" : ""
            }  `}
          >
            Text-1
          </button>
          <button
            onClick={() => setDurum(3)}
            className={`font-bold text-[19px] border-2  bg-[#171717] rounded-[6px] p-[4px]  ${
              durum === 3 ? "bg-[linear-gradient(90deg,#b004b0,#38097a)]" : ""
            }`}
          >
            Text-2
          </button> */}
        </div>
        <div className="grid grid-cols-3 p-10 justify-center items-center gap-8 lg:grid-cols-2 tl:grid-cols-1  ">
          {durum === 1
            ? projects.map((item, i) => <ProjectCard key={i} item={item} />)
            : null}
        </div>
        {/* {durum === 2 ? (
          <div
            id="text2"
            className="tab-pane  text-center text-white py-16 max-w-4xl mx-auto lg:p-5 "
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            atque porro quasi dolorum facere tempore maxime nemo quia nulla
            blanditiis doloribus, dolore, voluptas aspernatur harum facilis
            cumque magni soluta sapiente.
          </div>
        ) : null} */}
        {/* {durum === 3 ? (
          <div
            id="text1"
            className="tab-pane  text-center text-white py-5   lg:p-5"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, nisi.
          </div>
        ) : null} */}
      </div>
    </>
  );
}

export default Projects;
