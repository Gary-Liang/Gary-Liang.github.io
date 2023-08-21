import React, {useEffect, useState, forwardRef } from 'react'
import GlitchEffect from './GlitchEffect';


const Intro = forwardRef(function Intro({setGlitchRendered}, ref) {

    const [textLoaderDone, setTextLoaderDone] = useState(false);
    const [animatedText, setAnimatedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pageLoaded, setPageLoaded] = useState(false);
    const loadText = "Hello, I am Gary Liang";
    const intervalTime = 45;

    useEffect(() => {
        if (currentIndex < loadText.length) {
            setTimeout(() => {
                setAnimatedText(animatedText + loadText[currentIndex]);

                setCurrentIndex(currentIndex + 1);

            }, intervalTime);
        } else {
            setTimeout(() => {
                setTextLoaderDone(true)
            }, intervalTime * 4);
        }

    }, [currentIndex]);


    useEffect(() => {
        console.log('calling document ready state ' + document.readyState);
        if (document.readyState === 'complete') {
                setPageLoaded(true);
                console.log('set page state loaded to true');
        }
    },[textLoaderDone]);




    return <div className="introLoader" >
        {!textLoaderDone ?
            <div className="helloIntro">
                {animatedText}
            </div> : (pageLoaded ? <GlitchEffect setGlitchRendered={setGlitchRendered} ref={ref}/> : null)
        }
    </div>
});


export default Intro;