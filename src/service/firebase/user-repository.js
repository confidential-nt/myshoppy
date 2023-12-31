import { database } from "./firebase";
import { ref, set, onValue, update, get } from "firebase/database";

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

  findById(uid) {
    return get(ref(database, "users/" + uid)).then((snapshot) =>
      snapshot.val()
    );
  }

  #isExists(uid, callback) {
    this.findById(uid).then((value) => {
      if (!value) {
        callback();
      }
    });
  }

  updateCartsOnce(uid, productId, option) {
    const updates = {};

    updates["users/" + uid + "/carts/" + productId] = {
      count: 1,
      option,
    };

    return update(ref(database), updates);
  }

  updateCount(uid, productId, mount) {
    onValue(
      ref(database, "users/" + uid + "/carts/" + productId),
      (snapshot) => {
        const updates = {};

        updates["users/" + uid + "/carts/" + productId + "/count"] =
          snapshot.val().count + mount;

        return update(ref(database), updates);
      },
      { onlyOnce: true }
    );
  }

  deleteCarts(uid, productId) {
    const updates = {};

    updates["users/" + uid + "/carts/" + productId] = null;

    return update(ref(database), updates);
  }

  onUpdateCarts(callback, uid) {
    const cartsRef = ref(database, "users/" + uid + "/carts");
    onValue(cartsRef, (snapshot) => callback(snapshot.val()));
  }
}
