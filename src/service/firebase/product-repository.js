import { database } from "./firebase";
import { ref, child, push, set } from "firebase/database";

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
}
