import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-GQBDSlr0eaWUl-a0MuvLjnNzSvY4-7M",
  authDomain: "diaryapp-28a32.firebaseapp.com",
  projectId: "diaryapp-28a32",
  databaseUrl: "https://diaryapp-28a32-default-rtdb.firebaseio.com/",
  storageBucket: "diaryapp-28a32.appspot.com",
  messagingSenderId: "572169214434",
  appId: "1:572169214434:web:c3caeab77c39001d7241bb",
  measurementId: "G-15VTY7QYXN",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
