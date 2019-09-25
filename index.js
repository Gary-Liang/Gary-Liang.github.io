

import html2canvas from "html2canvas";
import * as THREE from 'three';
/*import velocity from 'velocity-animate';*/
require('velocity-animate');


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

//for some reason, it was undefined
let background, renderBackground, renderScene, composer1, loader;

let ajax = document.getElementById("page-structure");
/*let loadingText = document.getElementById("loader-text");*/

/*window.jQuery = window.$ = require(jQuery);*/

/*require.config({
    paths: {
        "jquery": "node_modules/jquery/dist/jquery.js",
        "velocity": "node_modules/velocity-animate/velocity.js",

    },
    shim: {
        "velocity": {
            deps: [ "jquery" ]
        },
        // Optional, if you're using the UI pack:
        "velocity-ui": {
            deps: [ "velocity" ]
        }
    }
});*/
console.log("hi2");

//deprecated
//$(document).ready(function() {
$(function() {


    // CANVAS & MOBILE TEST
    let windowWidth = $(window).width(),
        windowHeight = $(window).height();
    /*let isMobile = navigator.userAgent.match(/mobile/i);*/
    let webGLTrue = false;

    if (window.WebGLRenderingContext) {
        webGLTrue = true;
    }

    // CLASSES
    /*if (isMobile) {
        $('body').addClass('mobile');
    }
    else if (!isMobile) {
        $('body').addClass('desktop');
    }*/

    // GLOBAL VARIABLES
    let img,
        canvas,
        container,
        imgRatio,
        containerRatio;
    let screenShotCanvas,
        canvasDataURL,
        canvasImage,
        screenCaptured = false,
        animateable = true,
        popstate = false,
        isFourOhFour = false,
        inputReady = true;

    //let seriously,
    //    sourceImage,
    //    layers,
    //    edge,
    //    blend1,
    //    linearGreen,
    //    scale1,
    //    blend2,
    //    linearPurple,
    //    scale2,
    //    blend3,
    //    blend4,
    //    blend5,
    //    target;

    // INITIAL LOAD FUNCTIONS

    startupFunctions();


    $(window).on('load', function(){
        if (webGLTrue) {
            captureScreen();
        }
        initialLoader();


    });

    function startupFunctions() {
        /*if (isMobile) {
            $('body').removeClass('noscroll');
        }*/

        widowControl();
    }

    // IMAGE FUNCTIONS
    //function imageFunctions() {

        //let slickDrag = false;
        //if (isMobile) {
        //    slickDrag = true;
       // }
   // }

    // DEBOUNCE FUNCTION
    function debounce(func, wait, immediate) {
        let timeout;

        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    let debounceAdjust = debounce(function() {
        widowControl();
    }, 50);

    window.addEventListener('resize', debounceAdjust);

    // WIDOW CONTROL
    function widowControl() {
        windowWidth = $(window).width();
        let widowElements = $('h1, h2, h3, h4, h5, h6, li, p, figcaption, .case-study-tagline, .large-cta').not('.discovery_cell p, #site-nav li, footer li');


        /*widowElements.each(function() {
            $(this).html($(this).html().replace(/&nbsp;/g, ' '));
        });

        if (windowWidth > 640) {
            widowElements.each(function() {
                $(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
            });
        }*/
    }

    // HTML CANVAS & INITIAL LOAD FUNCTIONS
    function captureScreen() {
        html2canvas((ajax), {
            letterRendering: true,
        }).then(canvas  => {
            screenShotCanvas = canvas;
            canvasDataURL = screenShotCanvas.toDataURL();
            canvasImage = new Image();
            canvasImage.src = canvasDataURL;
            screenCaptured = true;
            /*canvasImage.style.border = "none";*/
            console.log(canvas);
        });
    }

    function initialLoader() {
        $('body').removeClass('noscroll');

        let loadText = 'Hello, I am Gary Liang.';
        let loaderDone = false;
        $.each(loadText.split(''), function(i, letter){
            setTimeout(function(){
                $('#loader-text').html($('#loader-text').html() + letter);
                /*loadingText.html((loadingText).html() + letter);*/
            }, 70*i);
        });

        setTimeout(function(){
            loaderDone = true;
        }, 1700);

        //check to make sure the document has been fully loaded before removing loader
        let readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete" && loaderDone ) {
                clearInterval(readyStateCheckInterval);
                $('#initial-loader').velocity({
                    translateZ: 0,
                    opacity: 0
                }, {
                    //display: 'none',
                    delay: 0,
                    duration: 800
                });

                if (webGLTrue) {
                    loadPageCanvas();

                    setTimeout(function(){
                        removePageCanvas();
                        $('#initial-loader').remove();
                    }, 500);
                }
                else {
                    setTimeout(function(){
                        $('#initial-loader').remove();
                    }, 1001);
                }
            }
        }, 10);
    }



    // GLITCHING
    function initializeGlitch(image, height) {
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

        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = height;
        /*let SCREEN_HEIGHT = window.innerHeight;
        console.log(SCREEN_HEIGHT);
        console.log(height);*/
        //let ratio = SCREEN_WIDTH / SCREEN_HEIGHT;

        /*if (height > 4096){
            SCREEN_HEIGHT = 4096;
        }*/

        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = height / 2;

        let delta = 0.1;

        function init(){
            scene = new THREE.Scene();
            sceneBG = new THREE.Scene();

            camera = new THREE.OrthographicCamera( -windowHalfX, windowHalfX, windowHalfY, -windowHalfY, 1, 10000 );
            camera.position.z = 100;


            let texture = new THREE.TextureLoader().load( image );
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
            bgMesh.scale.set( SCREEN_WIDTH, height, 1 );
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

            $(renderer.domElement).attr('id', 'loader').css('height', height);
            $('#main-body').append( renderer.domElement );

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

    function loadPageCanvas() {
        $('html').velocity('scroll', {
            axis: 'y',
            duration: 1000,
            mobileHA: false
        });

        animateable = true;

        initializeGlitch(canvasDataURL, screenShotCanvas.height);

        $('#loader').velocity({
            opacity: [1, 0]
        }, {
            duration: 1000
        });
    }


    function removePageCanvas() {
        $('#loader').velocity({
            opacity: 0
        }, {
            delay: 500,
            duration: 1000
        });

        setTimeout(function(){
            animateable = false;
            $('#loader').remove();
        }, 1600);
    }


});


/*Home page elements*/
/*resetHelloiaman();*/
// daWidth("before load");
/*var current = "";

window.onload = function() {
    $('.name.switch').on('touchstart click', function(e) {
        e.preventDefault();
        switchToHome('.name');
    });
    $('.tech.switch').on('touchstart click', function(e) {
        e.preventDefault();
        switchToHome('.tech');
    });
    $('.creative.switch').on('touchstart click', function(e) {
        e.preventDefault();
        switchToHome('.creative');
    });
    $('.avid.switch').on('touchstart click', function(e) {
        e.preventDefault();
        switchToHome('.avid');
    });
};
window.onresize = function() {
    maxFillText('.text-fill', completion=function() {
        switchToHome(current);
    });
};   */
