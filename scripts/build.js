const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Running Angular build...');
execSync('npx ng build', { stdio: 'inherit' });

console.log('Running post-build processing...');
require('./post-build.js');

console.log('Build complete!');
