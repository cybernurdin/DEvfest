const fs = require('fs');
const path = require('path');

// Read .env if it exists
const envPath = path.resolve(__dirname, '../.env');
const envVars = {};

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const value = trimmed.substring(idx + 1).trim();
        envVars[key] = value;
      }
    }
  });
}

const apiKey = process.env.GOOGLE_MAPS_API_KEY || envVars.GOOGLE_MAPS_API_KEY || '';
const gcpProject = process.env.GOOGLE_CLOUD_PROJECT || envVars.GOOGLE_CLOUD_PROJECT || 'devfest-cybernurdin5-20261120';

const envDir = path.resolve(__dirname, '../src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const envFileContent = (isProd) => `// Generated automatically by scripts/generate-env.js
export const environment = {
  production: ${isProd},
  googleMapsApiKey: '${apiKey}',
  gcpProjectId: '${gcpProject}',
  defaultCenter: {
    lat: 5.9631,
    lng: 10.1591
  },
  bamendaBounds: {
    north: 6.02,
    south: 5.90,
    east: 10.22,
    west: 10.10
  }
};
`;

fs.writeFileSync(path.join(envDir, 'environment.ts'), envFileContent(false), 'utf8');
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), envFileContent(true), 'utf8');

console.log('Environment files generated successfully.');
