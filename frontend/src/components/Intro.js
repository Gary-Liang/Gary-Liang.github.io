import React, {useEffect, useState, forwardRef } from 'react'
import GlitchEffect from './GlitchEffect';


const Intro = forwardRef(function Intro(props, ref) {

    const [textLoaderDone, setTextLoaderDone] = useState(false);
    const [animatedText, setAnimatedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const loadText = "Hello, I am Gary Liang";
    const intervalTime = 45;
    // const introTestProp = testProp;

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

        // if (ref) {
        //     console.log("called from intro level: " + ref.current);
        //     appRef.current = ref.current;
        // }

    }, [currentIndex]);




    return <div className="introLoader">
        {!textLoaderDone ?
            <div className="helloIntro">
                {animatedText}
            </div> : <GlitchEffect ref={ref}/>
        }
    </div>
});


export default Intro;