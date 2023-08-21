import React, {useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import img from "../assets/images/contact-img.png";
import Popup from './Popup'

function Contact() {

  const [isMessageSent, setIsMessageSent] = useState(false);

  const form = useRef();


  const handlePopupClose = () => {
    setIsMessageSent(false);
    form.current.reset();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY)
    .then((result) => {
        console.log(result.text);
        setIsMessageSent(true);
    }, (error) => {
        console.log(error.text);
    });
};
  
  return (
    <>
      <div id="contact" className="contact bg-[linear-gradient(90deg,#F9FAFB,#444444);]">
        <div className="wrapper flex justify-center  py-16 gap-52 lg:py-12">
          <div className="imgbox lg:hidden">
            <img className="w-[550px] h-full" src={img} alt="" />
          </div>
          <div className="content-box">
            <h1 className="text-black font-bold text-4xl">Get In Touch</h1>
            <p className="text-black text-lg py-1">
              If you're interested in tech, coding, or just want to chat, let's connect!
            </p>
            <p className="text-black text-lg py-1">
              Thank you for visiting my page, and I'm excited to connect with fellow tech enthusiasts!
            </p>
            <form ref={form} onSubmit={sendEmail} action="" className="flex flex-col ">
              <div className="flex gap-14">
                <label className="font-bold text-red-500">First Name<span className="text-gray-500">(required)</span></label>
                <label className="font-bold text-gray-500">Last Name</label>
              </div>
              <div className="flex gap-4 py-2 ">
                <input
                  className="bg-transparent h-14 rounded-2xl  border-[1px] border-white pl-4 text-white placeholder-white lg:w-36 "
                  type="text"
                  name="first_name"
                  required
                  placeholder="First Name"
                />
                <input
                  className="bg-transparent h-14  rounded-2xl  border-[1px] border-white pl-4 text-white placeholder-white  lg:w-36"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex gap-24">
                <label className="font-bold text-red-500">Email<span className="text-gray-500">(required)</span></label>
                <label className="font-bold text-gray-500">Phone Number</label>
              </div>
              <div className="flex gap-4  py-4">
                <input
                  className="bg-transparent h-14  rounded-2xl   border-[1px] border-white pl-4 text-white placeholder-white  lg:w-36"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="bg-transparent h-14  rounded-2xl  border-[1px] border-white pl-4 text-white placeholder-white  lg:w-36"
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                />
              </div>
              <div className="flex gap-24">
                <label className="font-bold text-red-500">Message<span className="text-gray-500">(required)</span></label>
              </div>
              <textarea
                className="bg-transparent rounded-2xl border-[1px] border-white h-36 pl-4 text-white w-full placeholder-white pt-2"
                rows={40}
                cols={35}
                placeholder="Message"
                name="message"
                required
              ></textarea>
              <button className="bg-white border-black border-[1] py-[16px] rounded-lg px-8 my-8 w-32 font-bold ">Send</button>
            </form>
          </div>

        </div>

      </div>
      {isMessageSent && <Popup message="Message sent sucessfully!" onClose={handlePopupClose} />}
    </>
  );
}

export default Contact;
