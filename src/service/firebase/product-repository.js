import { database } from "./firebase";
import { ref, child, push, set, onValue, get } from "firebase/database";

export default class ProductRepository {
  async insert(product) {
    const newProductKey = push(child(ref(database), "posts")).key;
    await set(ref(database, "products/" + newProductKey), {
      uid: product.uid,
      imageURL: product.imageURL,
      name: product.name,
      price: product.price,
      category: product.category,
      desc: product.desc,
      options: product.options,
    });
  }

  findById(productId, callback) {
    onValue(
      ref(database, "products/" + productId),
      (snapshot) => {
        callback(snapshot.val());
      },
      { onlyOnce: true }
    );
  }

  findAll() {
    return get(ref(database, "products/")).then((snapshot) => snapshot.val());
  }
}
