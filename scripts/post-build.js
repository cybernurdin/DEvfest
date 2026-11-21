const fs = require('fs');
const path = require('path');

const browserDir = path.resolve(__dirname, '../dist/safecity/browser');
const csrPath = path.join(browserDir, 'index.csr.html');
const indexPath = path.join(browserDir, 'index.html');
const alertsIndexPath = path.join(browserDir, 'alerts/index.html');

if (fs.existsSync(csrPath) && !fs.existsSync(indexPath)) {
  fs.copyFileSync(csrPath, indexPath);
  console.log('Copied index.csr.html to index.html for static routing.');
} else if (fs.existsSync(alertsIndexPath) && !fs.existsSync(indexPath)) {
  fs.copyFileSync(alertsIndexPath, indexPath);
  console.log('Copied alerts/index.html to index.html for root routing.');
}
