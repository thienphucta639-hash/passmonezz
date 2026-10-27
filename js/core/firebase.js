// Khởi tạo Firebase SDK (dùng CDN ESM chính thức của Firebase v10+)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: window.__ENV__?.FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: window.__ENV__?.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  databaseURL: window.__ENV__?.FIREBASE_DATABASE_URL || "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: window.__ENV__?.FIREBASE_PROJECT_ID || "YOUR_PROJECT",
  storageBucket: window.__ENV__?.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
  messagingSenderId: window.__ENV__?.FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: window.__ENV__?.FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
