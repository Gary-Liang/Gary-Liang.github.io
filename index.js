

import html2canvas from "html2canvas";
import * as THREE from 'three';
/*import velocity from 'velocity-animate';*/
require('velocity-animate');


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import JQuery from "jquery";
import textfill from "./jquery.textfill.min";

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
    console.log("hi3");

    // CANVAS & MOBILE TEST
    let windowWidth = $(window).width(),
        windowHeight = $(window).height();
    /*let isMobile = navigator.userAgent.match(/mobile/i);*/
    let webGLTrue = false;

    if (window.WebGLRenderingContext) {
        webGLTrue = true;
    }
    console.log("hi4");
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
    console.log("hi5");

   /* $(window).on('load', function(){*}*/
    /*Had to comment out.*/
        console.log("hi6");
        if (webGLTrue) {
            captureScreen();
            console.log("hi7");
        }
        console.log("hi8");
        initialLoader();


  /*  });*/

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
       /* windowWidth = $(window).width();
        let widowElements = $('h1, h2, h3, h4, h5, h6, li, p, figcaption, .case-study-tagline, .large-cta').not('.discovery_cell p, #site-nav li, footer li');*/


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
            }, 60*i);
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




    /*Home page elements*/
    function daWidth(event) {
        let jquery_width = $(/*.home-content */'.grid2 span').width();
        let js_width = document.querySelector(/*'.home-content */'.grid2 span').offsetWidth;

        console.log(event + " - jquery:" + jquery_width + ", js:" + js_width);
    }
    function resetHelloiaman() {
        $('.home-content .i-am').removeAttr('style');
        $('.home-content .i-am span').removeAttr('style');
    }
    function helloiaman(section) {
        // resetHelloiaman();

        let WIDTH = document.querySelector('.home-content .i-am .grid2').offsetWidth;
         console.log(WIDTH);
        let section_width;
        let offset;

        if (section === "helloiam") {
            section_width = 203 / 263;
            offset = 0;
        } else if (section === "iama") {
            section_width = 108 / 263;
            offset = 128 / 263;
        } else if (section === "iaman") {
            section_width = 135 / 263;
            offset = 128 / 263;
        }

        offset = offset * 100;
        $('.home-content .i-am .grid2').css({
            '-ms-transform': 'translateX(-' + offset.toString() + '%)',
            '-webkit-transform': 'translateX(-' + offset.toString() + '%)',
            'transform': 'translateX(-' + offset.toString() + '%)'

        });
        $('.home-content .i-am').css('width', (section_width * WIDTH).toString() + "px" );

        console.log(offset);
        console.log("this has worked");
        // '-ms-transform': 'translateX(-' + offset.toString() + '%)',
        //     '-webkit-transform': 'translateX(-' + offset.toString() + '%)',
        //     'transform': 'translateX(-' + offset.toString() + '%)'
    }


    function maxFillText(selector, completion=function(){}) {
        $(selector).removeAttr('style');
        jQuery(selector).textfill({
            complete: function() {
                completion();
            }, maxFontPixels: 0
        });
    }

    function randimateTechTitle() {
        let LENGTH = 700;
        let FRAMES = 2;
        randimateText('.tech.title .line.one span', 'TECH', (LENGTH/FRAMES/4), FRAMES);
        randimateText('.tech.title .line.two span', 'LOVER', (LENGTH/FRAMES/5), FRAMES);
    }
// Switching functionality
    function switchToHomeTitle(selector) {
        $('.title').removeClass('visible');
        $(selector + '.title').addClass('visible');
        maxFillText(selector + '.title .text-fill');
    }
    function switchToHomeDetails(selector) {
        $('.details').removeClass('visible');
        $(selector + '.details').addClass('visible');
    }
    function switchToHomeSwitch(selector) {
        $('.switch').removeClass('active');
        $(selector + '.switch').addClass('active');
    }

    function isVowel(s) {
        return (/^[aeiou]$/i).test(s);
    }

    function switchToHome(selector) {
        switchToHomeTitle(selector);
        switchToHomeDetails(selector);
        switchToHomeSwitch(selector);

        // Case checks
        if (selector === ".name") {
            console.log('helloiam');
            helloiaman('helloiam');
        } else if ( isVowel(selector.charAt(1)) ) {
            console.log('iaman');
            helloiaman('iaman');
        } else {
            console.log('iama');
            helloiaman('iama');
        }


        if (selector === ".tech") {
            randimateTechTitle();
        }

        current = selector;
    }

    function randimateText(selector, text, speed, frames) {
        if (speed === undefined) {
            speed = 50;
        }
        if (frames === undefined) {
            frames = 8;
        }
        /*let theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";*/ // You can customize what letters it will cycle through
        let theLetters = "01";
        let ctnt = text; // Your text goes here
        let increment = frames; // frames per step. Must be >2
        // speed is per frame, not per rustle


        let clen = ctnt.length;
        let si = 0;
        let stri = 0;
        let block = "";
        let fixed = "";
        //Call self x times, whole function wrapped in setTimeout
        (function rustle (i) {
            setTimeout(function() {
                if (--i) { rustle(i); }
                nextFrame(i);
                si = si + 1;
            }, speed);
        })(clen*increment+1);
        function nextFrame(pos) {
            for (let i=0; i<clen-stri; i++) {
                //Random number
                let num = Math.floor(theLetters.length * Math.random());
                //Get random letter
                let letter = theLetters.charAt(num);
                block = block + letter;
            }
            if (si === (increment-1)) {
                stri++;
            }
            if (si === increment) {
                // Add a letter;
                // every speed*10 ms
                fixed = fixed +  ctnt.charAt(stri - 1);
                si = 0;
            }
            $(selector).html(fixed + block);
            block = "";
        }
    }

    /*Home page elements*/
    /*resetHelloiaman();*/
 //daWidth("before load");
console.log("theLasthi");
    let current = "";

    /*window.onload = function() {*/
        console.log("thelasthi2");
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
        /*$('.avid.switch').on('touchstart click', function(e) {
            e.preventDefault();
            switchToHome('.avid');
        });*/
    /*};*/
    /*window.onresize = function() {
        maxFillText('.text-fill', function() {
            switchToHome(current);
        });
    };*/
});



