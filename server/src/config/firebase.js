import admin from 'firebase-admin';

const initializeFirebase = () => {
  if (!admin.apps.length) {
    // Uses GOOGLE_APPLICATION_CREDENTIALS environment variable
    // or default service account if running in Google Cloud environment
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
};

export { initializeFirebase, admin };