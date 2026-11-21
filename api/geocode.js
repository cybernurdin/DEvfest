module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query.q || req.query.address || 'Bamenda, Cameroon';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const BAMENDA_KNOWN_AREAS = {
    'up station': { name: 'Up Station', lat: 5.959, lng: 10.158, radius: 1200 },
    'commercial avenue': { name: 'Commercial Avenue', lat: 5.962, lng: 10.153, radius: 800 },
    'nkwen': { name: 'Nkwen Sector', lat: 5.981, lng: 10.172, radius: 1500 },
    'mile 4': { name: 'Mile 4 Nkwen', lat: 5.992, lng: 10.184, radius: 1000 },
    'food market': { name: 'Main Food Market', lat: 5.960, lng: 10.151, radius: 600 },
    'station hill': { name: 'Station Hill Descent', lat: 5.952, lng: 10.162, radius: 1100 }
  };

  const lower = query.toLowerCase();
  for (const [key, area] of Object.entries(BAMENDA_KNOWN_AREAS)) {
    if (lower.includes(key)) {
      return res.status(200).json({
        query,
        resolvedLocation: area.name,
        coarseCoordinates: { lat: area.lat, lng: area.lng },
        radiusMeters: area.radius,
        source: 'SafeCity Coarse Spatial Registry (Bamenda)',
        city: 'Bamenda, Cameroon'
      });
    }
  }

  // If Google Maps API Key is available, forward coarse lookup
  if (apiKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query + ', Bamenda, Cameroon')}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const first = data.results[0];
        // Enforce Cameroon Law No. 2024/017 coarse rounding (approx 1.1km)
        const lat = Math.round(first.geometry.location.lat * 100) / 100;
        const lng = Math.round(first.geometry.location.lng * 100) / 100;

        return res.status(200).json({
          query,
          resolvedLocation: first.formatted_address,
          coarseCoordinates: { lat, lng },
          source: 'Google Maps Geocoding API (Coarse Privacy Filtered)',
          city: 'Bamenda, Cameroon'
        });
      }
    } catch (err) {
      console.error('Google Maps API Geocode error:', err.message);
    }
  }

  // Fallback default Bamenda center
  return res.status(200).json({
    query,
    resolvedLocation: 'Bamenda Urban Center',
    coarseCoordinates: { lat: 5.963, lng: 10.159 },
    radiusMeters: 2500,
    source: 'Default Regional Anchor (Bamenda, Cameroon)',
    city: 'Bamenda, Cameroon'
  });
};
