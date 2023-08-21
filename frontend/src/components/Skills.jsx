import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles.css";
import { Navigation } from "swiper";
import { Pagination } from "swiper";
import bg from "../assets/images/banner-bg.png"

function Skills() {
  return (
    <>
      <div id="skills" style={{backgroundImage: `url(${bg})`}} className="wrapper h-full bg-no-repeat bg-bottom bg-cover p-16 lg:p-4">
        <div className="skills-wrapper text-center text-white bg-[#171717] p-10 rounded-[50px] lg:p-2">
          <h1 className="text-4xl ">Skills</h1>
          <p className="text-lg py-3">
            Current skillset and tools
          </p>
          <div className="box flex  justify-between  items-center bg-[#171717] my-6">
            <Swiper
              slidesPerView={3}
              spaceBetween={40}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
              className="mySwiper "
            >
              <SwiperSlide className="bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                  <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 70, "--size": "12rem"}}>
                    70%
                  </div>
                  <h1 className="font-bold text-2xl my-2">HTML/CSS</h1>
               </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
              <div className="bg-[#171717] w-[215px]">
                  <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 60, "--size": "12rem"}}>
                    60%
                  </div>
                  <h1 className="font-bold text-2xl my-2">Javascript</h1>
               </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 80, "--size": "12rem"}}>
                      80%
                    </div>
                    <h1 className="font-bold text-2xl my-2">React.js</h1>
                </div>
              </SwiperSlide>

              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 70, "--size": "12rem"}}>
                      70%
                    </div>
                    <h1 className="font-bold text-2xl my-2">Node.js</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 80, "--size": "12rem"}}>
                      80%
                    </div>
                    <h1 className="font-bold text-2xl my-2">Python</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 80, "--size": "12rem"}}>
                      80%
                    </div>
                    <h1 className="font-bold text-2xl my-2">Java</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 80, "--size": "12rem"}}>
                      80%
                    </div>
                    <h1 className="font-bold text-2xl my-2">MongoDB</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 95, "--size": "12rem"}}>
                      95%
                    </div>
                    <h1 className="font-bold text-2xl my-2">RESTful APIs</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 85, "--size": "12rem"}}>
                      85%
                    </div>
                    <h1 className="font-bold text-2xl my-2">Agile Development</h1>
                </div>
              </SwiperSlide>
              <SwiperSlide className=" bg-[#171717]">
                <div className="bg-[#171717] w-[215px]">
                    <div className="radial-progress text-primary font-bold text-3xl" style={{ "--value": 50, "--size": "12rem"}}>
                      50%
                    </div>
                    <h1 className="font-bold text-2xl my-2">Frontend</h1>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skills;
