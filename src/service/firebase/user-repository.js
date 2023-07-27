import { database } from "./firebase";
import { ref, set, onValue, update } from "firebase/database";

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

  updateCarts(uid, productId) {
    const updates = {};
    updates["users/" + uid + "/carts/" + productId] = true;
    return update(ref(database), updates);
  }

  onUpdateCarts(callback, uid) {
    const cartsRef = ref(database, "users/" + uid + "/carts");
    onValue(cartsRef, (snapshot) => callback(snapshot.val()));
  }
}
