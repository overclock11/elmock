#!/usr/bin/env node
"use strict";

const process = require('process');
const childProcess = require('child_process');
const WriteModule = require('./cli/addModule');

if(process.argv[2] === 'start'){
    runScript('./app.js', (message) =>{
        console.log(message)
    });
}

if(process.argv[2] === 'service'){
    // solo crea archivos
}
async function runScript(scriptPath, callback) {
    let invoked = false;
    let process = childProcess.fork(scriptPath, {execArgv: ['--harmony']});

    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

    process.on('message', function (code) {
        callback(code);
    });
}