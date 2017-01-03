import * as firebase from 'firebase';


let db = null;

const firebaseConfig = {
  apiKey       : "AIzaSyBW3SjE636qGwi0KaWEC0TyxP7oE_E04yg",
  authDomain   : "todos-1c05d.firebaseapp.com",
  databaseURL  : "https://todos-1c05d.firebaseio.com",
  storageBucket: "todos-1c05d.appspot.com",
};

export function initDb() {
  db = firebase.initializeApp(firebaseConfig);
}
export function getDb() {
  return db.database();
}

export function getDbOnce(cb) {
  return db.database().ref('todos').once('value', data => cb(data.val()));
}
