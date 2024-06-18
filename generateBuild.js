const fs = require('fs');
const packageJson = require('./package.json');

const buildInfo = {
  version: packageJson.version,
  buildDate: new Date().toISOString(),
};

fs.writeFileSync('./build-info.json', JSON.stringify(buildInfo, null, 2));
console.log('Build info generated');