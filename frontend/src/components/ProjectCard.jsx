import React from 'react'

function ProjectCard({item}) {
  return (
    <>
      <div className="img-box w-[450px] lg2:w-auto h-full mx-auto flex justify-center items-center relative overflow-hidden rounded-3xl">
              <img src={item.img} alt="" className='w-full h-full' />
              <div className="p absolute top-[-100%] left-0 h-full w-full text-center bg-[#008b8b80] p-4 pt-20">
                <h1 className="font-bold text-3xl">{item.title}</h1>
                <p className="mb-4 font-bold">{item.description}</p>
                <a href={item.demo} target="_blank"  className="px-4 py-2 bg-blue-500 text-white rounded">Demo</a>
                <a href={item.github} target="_blank" className="px-4 py-2 bg-red-500 text-white rounded">GitHub</a>
              </div>
            </div>
    </>
  )
}

export default ProjectCard