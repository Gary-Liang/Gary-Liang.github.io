const webpack = require('webpack');

const path = require('path');

// to make three.js package global
let plugins = [
    new webpack.ProvidePlugin({
        //THREE: "three",
        //EffectComposer: "three/examples/js/postprocessing/EffectComposer",
        //RenderPass: "three/examples/jsm/postprocessing/RenderPass"
        //ShaderPass: "three/examples/jsm/postprocessing/ShaderPass",
        //ShaderCopy: "three/examples/jsm/shaders/ShaderCopy",
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
];


module.exports = {
    mode: "development",
    entry: './index.js',
    plugins: plugins,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname)
    },
    /*module.exports = {
        mode: "development",
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },*/
    //module: {
    //    rules: [
    //        {
                //test: /three\/examples\/jsm/,
                //use: 'imports-loader?THREE=three'
    //        }
    //    ]
    //},
    //resolve: {
    //    alias: {
    //        'three-examples': path.join(__dirname, './node_modules/three/examples/jsm')
    //    }
    //}
};