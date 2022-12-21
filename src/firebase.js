// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0rRzj5nL6uOyBDJOXXm4E1fDquFn-J2I',
  authDomain: 'gogi-images.firebaseapp.com',
  projectId: 'gogi-images',
  storageBucket: 'gogi-images.appspot.com',
  messagingSenderId: '320266765921',
  appId: '1:320266765921:web:2327d4df8f08b59d1a4c20',
  measurementId: 'G-9M7N3DT8V1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
