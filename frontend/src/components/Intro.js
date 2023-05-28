import React, {useEffect, useState } from 'react'
import GlitchEffect from './GlitchEffect';

export default function Intro({appRef}) {

    const [textLoaderDone, setTextLoaderDone] = useState(false);
    const [animatedText, setAnimatedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const loadText = "Hello, I am Gary Liang";
    const intervalTime = 60;
    

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




    return <div className="introLoader">
        {!textLoaderDone ?
            <div className="helloIntro">
                {animatedText}
            </div> : <GlitchEffect appRef={appRef}/>
        }
    </div>
}