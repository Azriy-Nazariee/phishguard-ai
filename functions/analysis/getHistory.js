const { db } = require('../firebase'); // Firestore from your firebase.js

const getHistoryHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const userId = req.userId; // From auth middleware

  if (!userId) {
    return res.status(401).send('User ID is required');
  }

  try {
    const snapshot = await db
      .collection('Reports')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();

    const history = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.date,
        title: data.title,
        sender: data.sender,
        isPhishing: data.isPhishing,
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
        suggestion: data.suggestion,
        urls: data.urls,
        flaggedKeywords: data.flaggedKeywords || [],
        userId: data.userId,
      };
    });

    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error.message || error);
    return res.status(500).json({ error: 'Error fetching history' });
  }
};

module.exports = getHistoryHandler;
