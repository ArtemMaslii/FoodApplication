"use strict";

let path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/main/resources/static/js/script",
    output: {
        filename: "bundle.js",
        path: __dirname + "/src/main/resources/static/js/"
    },
    watch: true,

    devtool: "source-map",

    module: {
    },

};