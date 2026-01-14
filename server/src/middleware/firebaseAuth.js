import { admin } from '../config/firebase.js';
import User from '../models/User.js';

const firebaseAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if user exists in our DB, if not, create or just fail?
    // Requirement says "verify the firebase_uid".
    // We usually need the mongo User ID for references.
    
    let user = await User.findOne({ firebase_uid: decodedToken.uid });

    if (!user) {
        // For development/initial setup convenience:
        // Attempt to create user from token details
        user = new User({
            firebase_uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name || 'User', // Fallback
            photoURL: decodedToken.picture
        });
        await user.save();
    }

    req.user = user;
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default firebaseAuth;