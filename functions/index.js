const functions = require('firebase-functions'); // ✅ Important
const express = require('express');
const cors = require('cors');

// Middleware
const authenticateFirebaseUser = require('./middleware/auth');

// Route handlers
const signUpHandler = require('./registration/signUp');
const submitFeedbackHandler = require('./feedback/submitFeedback');
const analyseFileHandler = require('./analysis/analyseFile');
const getHistoryHandler = require('./analysis/getHistory');
const getReportHandler = require('./report/getReport');

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.post('/api/signup', signUpHandler);
app.post('/api/feedback', submitFeedbackHandler);

// Protected routes
app.post('/api/analyse-file', authenticateFirebaseUser, ...analyseFileHandler);
app.get('/api/analysis-history', authenticateFirebaseUser, getHistoryHandler);
app.get('/api/report/:id', authenticateFirebaseUser, getReportHandler);

// Don't use app.listen — Firebase handles this
exports.api = functions.https.onRequest(app);
