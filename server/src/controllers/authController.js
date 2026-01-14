export const login = async (req, res) => {
  try {
    // req.user and req.firebaseUser are populated by the firebaseAuth middleware
    const user = req.user;
    const { email, name, picture } = req.firebaseUser;
    
    const tokenName = name || 'User';
    
    user.email = email;
    user.displayName = tokenName;
    user.photoURL = picture;

    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};