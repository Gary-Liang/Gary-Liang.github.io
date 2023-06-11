import html2canvas from "html2canvas";
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

import React, {forwardRef, useEffect, useState } from 'react'

const GlitchEffect = forwardRef(function GlitchEffect({textLoaderDone}, ref) {


    let screenShotCanvas,
    canvasDataURL,
    canvasImage,
    screenCaptured = false,
    animateable = true,
    popstate = false,
    isFourOhFour = false,
    inputReady = true;

    const appElement = ref.current;
    console.log(textLoaderDone);
    console.log(appElement);

    const [webGL, setWebGL] = useState(false);


    useEffect(() => {
        if (window.WebGLRenderingContext) {
            setWebGL(true);
        }
    }) 


    function captureScreen() {
        html2canvas((appElement), {
            letterRendering: true,
        }).then(canvas  => {
            screenShotCanvas = canvas;
            canvasDataURL = screenShotCanvas.toDataURL();
            canvasImage = new Image();
            canvasImage.src = canvasDataURL;
            screenCaptured = true;
            console.log(canvas);
        });
    }

    function triggerFunction() {
        console.log(textLoaderDone);
        console.log(appElement);
        return <div className='testTrigger'></div>
    }


    return <div className='glitchEffect'>
        {triggerFunction()}
    </div>

});


export default GlitchEffect;