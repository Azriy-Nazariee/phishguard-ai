import express from 'express';
import cors from 'cors';

// Import Firebase Auth middleware
import { authenticateFirebaseUser } from './middleware/authenticateFirebaseUser.js';

// Route handlers
import signUpHandler from './registration/signUp.js';
import loginHandler from './registration/login.js';
import submitFeedbackHandler from './feedback/submitFeedback.js';
import analyseFileHandler from './analysis/analyseFile.js';
import getHistoryHandler from './analysis/getHistory.js';
import getReportHandler from './report/getReport.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.post('/api/signup', signUpHandler);
app.post('/api/login', loginHandler);
app.post('/api/feedback', submitFeedbackHandler);

// Protected routes (require Firebase ID token)
app.post('/api/analyse-file', authenticateFirebaseUser, ...analyseFileHandler);
app.get('/api/analysis-history', authenticateFirebaseUser, getHistoryHandler);
app.get('/api/report/:id', authenticateFirebaseUser, getReportHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
