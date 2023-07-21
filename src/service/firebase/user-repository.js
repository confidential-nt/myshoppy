import { database } from "./firebase";
import { ref, set, onValue } from "firebase/database";

export default class UserRepository {
  insert(user) {
    this.#isExists(user.uid, () => {
      set(ref(database, "users/" + user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        carts: {},
      });
    });
  }

  findById(uid, callback) {
    onValue(
      ref(database, "users/" + uid),
      (snapshot) => {
        callback(snapshot.val());
      },
      { onlyOnce: true }
    );
  }

  #isExists(uid, callback) {
    this.findById(uid, (value) => {
      if (!value) {
        callback();
      }
    });
  }
}
