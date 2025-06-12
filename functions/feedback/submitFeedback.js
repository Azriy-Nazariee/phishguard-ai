const { db } = require('../firebase');

const submitFeedbackHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { dashboardId, type, comments } = req.body;

  if (!dashboardId || !type) {
    return res.status(400).send('Dashboard ID and feedback type are required');
  }

  try {
    await db.collection('feedback').add({
      dashboardId,
      type,
      comments: comments || '',
      submittedAt: new Date().toISOString(),
    });

    return res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

module.exports = submitFeedbackHandler;
