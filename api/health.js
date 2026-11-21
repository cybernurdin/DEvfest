module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'healthy',
    system: 'SafeCity Community Safety Platform',
    targetCity: 'Bamenda, Cameroon',
    gcpProject: process.env.GOOGLE_CLOUD_PROJECT || 'devfest-cybernurdin5-20261120',
    mapsApiConfigured: !!(process.env.GOOGLE_MAPS_API_KEY),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    privacyCompliance: 'Cameroon Law No. 2024/017'
  });
};
