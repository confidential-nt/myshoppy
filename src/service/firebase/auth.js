import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export default class Auth {
  login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  logout() {
    signOut(auth);
  }

  onStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        callback(user.uid);
      } else {
        callback(null);
      }
    });
  }

  currentUser() {
    return auth.currentUser;
  }
}
