#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const electronPath = require('electron');

const appPath = path.join(__dirname, 'main.js'); // Entry to your Electron app

const child = spawn(electronPath, [appPath], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', function (code) {
  process.exit(code);
});
