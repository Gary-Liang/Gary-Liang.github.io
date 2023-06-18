import html2canvas from "html2canvas";
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

import React, {forwardRef, useEffect, useState, useRef } from 'react'

const GlitchEffect = forwardRef(function GlitchEffect(props, ref) {


    let screenShotCanvas,
    canvasDataURL,
    canvasImage,
    animateable = true,
    popstate = false,
    isFourOhFour = false,
    inputReady = true,
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    background, renderBackground, renderScene, composer1, loader;

    let windowHalfX = SCREEN_WIDTH / 2;
    let windowHalfY = SCREEN_HEIGHT / 2;

    let delta = 0.1;

    console.log(ref.current.innerHTML);

    const [webGL, setWebGL] = useState(false);
    const [screenCaptured, setScreenCaptured] = useState(false);
    const rendererRef = useRef(null);
    // const mainBodyRef = useRef(null);


    useEffect(() => {
        if (window.WebGLRenderingContext) {
            setWebGL(true);
        }
    }, []); 


    /**
     * We need to capture the screen of the application so we can apply 3d rendering to our glitch effect loaders.
     */
    function captureScreen() {
        html2canvas(ref.current, {
            letterRendering: true
        }).then(canvas  => {
            screenShotCanvas = canvas;
            canvasDataURL = screenShotCanvas.toDataURL();
            canvasImage = new Image();
            canvasImage.src = canvasDataURL;
            setScreenCaptured(true);
            console.log("canvas: " + canvas);
            console.log("canvas height: " + canvas.height);
            renderGlitchEffect();
        });
    }


    function renderGlitchEffect() {
        // GLITCHING
        var container,
            stats;

        var camera,
            scene,
            sceneBG,
            renderer,
            composer,
            composerScene;

        //var mesh,
        //    light,
        //    dotEffect,
        //    shiftEffect,
        //    sepiaEffect;

        let glitchDtSize = 100,
           glitchDelay = 1,
            glitchAmplification = .5;

        let fps = 20;
        if (isFourOhFour) {
            fps = 5;
        }

        // let SCREEN_WIDTH = window.innerWidth;
        // let SCREEN_HEIGHT = height;
        /*let SCREEN_HEIGHT = window.innerHeight;
        console.log(SCREEN_HEIGHT);
        console.log(height);*/
        //let ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

        /*if (height > 4096){
            SCREEN_HEIGHT = 4096;
        }*/

        function init(){
            scene = new THREE.Scene();
            sceneBG = new THREE.Scene();

            camera = new THREE.OrthographicCamera( -windowHalfX, windowHalfX, windowHalfY, -windowHalfY, 1, 10000 );
            camera.position.z = 100;


            let texture = new THREE.TextureLoader().load( canvasDataURL );
            // turns off resizing
            texture.minFilter = THREE.LinearFilter;

            // immediately use the texture for material creation
            //background
            let background = new THREE.MeshBasicMaterial( { map: texture } );


            background.map.needsUpdate = true;
            /*let plane = new THREE.PlaneBufferGeometry(1, 1);*/
            let plane = new THREE.PlaneBufferGeometry(1, 1);

            let bgMesh = new THREE.Mesh(plane, background);
            bgMesh.position.z = 1;
            bgMesh.scale.set( SCREEN_WIDTH, SCREEN_HEIGHT, 1 );
            sceneBG.add(bgMesh);

            bgMesh.material.map.needsUpdate = true;



            //var sceneMask = new THREE.Scene();

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0xffffff );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.autoClear = false;

            renderer.gammaInput = true;
            renderer.gammaOutput = true;

            renderBackground = new RenderPass( sceneBG, camera);

            // Set element attributes and append to mainBodyRef
            renderer.domElement.className = 'introLoader';
            renderer.domElement.style.height = SCREEN_HEIGHT;
            ref.current.appendChild(renderer.domElement);

            // Store the renderer reference
            rendererRef.current = renderer;

            let rtParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true };

            let clearMask = new ClearMaskPass();

            composer = new EffectComposer( renderer, new THREE.WebGLRenderTarget( SCREEN_WIDTH, SCREEN_HEIGHT, rtParameters ) );
            renderScene = new TexturePass( composer.renderTarget2.texture );
            composer.addPass(renderBackground);
            composer.addPass(clearMask);

            composer1 = new EffectComposer( renderer, new THREE.WebGLRenderTarget( SCREEN_WIDTH, SCREEN_HEIGHT, rtParameters ) );

            //let glitch = new GlitchPass(glitchDtSize, glitchDelay, glitchAmplification);
            let glitch = new GlitchPass(glitchDtSize);
            glitch.renderToScreen = true;

            composer1.addPass(renderScene);
            composer1.addPass(glitch);

            renderScene.uniforms[ 'tDiffuse' ].value = composer.renderTarget2;
        }

        function render() {
            renderer.clear();
            composer.render(delta);
            composer1.render(delta);
        }

        function animate() {
            if (animateable){
                setTimeout(function(){
                    render();
                    requestAnimationFrame( animate );
                }, 1000 / fps);
            }
        }

        init();
        animate();
    }

    function startGlitchEffect() {    
        if (webGL) {
            console.log("i was executed");
            captureScreen();

        }
    }


    return <div className='glitchEffect'>
        {startGlitchEffect()}
    </div>

});


export default GlitchEffect;