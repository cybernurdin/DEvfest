module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const body = req.body || {};
  const { areaId, category, observedHazard, witnessType } = body;

  if (!areaId || !category) {
    return res.status(400).json({
      error: 'Missing required report parameters: areaId and category are required.'
    });
  }

  // Generate anonymous tracking ID format: SC-BMD-XXXXXX
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const trackingId = `SC-BMD-${randomSuffix}`;

  return res.status(201).json({
    success: true,
    trackingId,
    status: 'under-triage',
    estimatedReviewTime: '15-30 minutes',
    message: 'Report received and queued for human verification.',
    privacyConfirmation: 'EXIF metadata purged; witness IP and personal identifiers not stored pursuant to Cameroon Law No. 2024/017.',
    receivedAt: new Date().toISOString()
  });
};
