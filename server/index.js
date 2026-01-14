import 'dotenv/config';
import app from './app.js';
import connectDB from './src/config/db.js';
import { initializeFirebase } from './src/config/firebase.js';

const PORT = process.env.PORT || 5000;

// Initialize Services
connectDB();
initializeFirebase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});