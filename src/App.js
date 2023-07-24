import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Products from "./pages/Products";
import Layout from "./layout/Layout";
import Carts from "./pages/Carts";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { UserRepositoryProvider } from "./context/UserRepositoryContext";
import ImageUploader from "./service/cloudinary/image-uploader";

const imageUploader = new ImageUploader();

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <UserRepositoryProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Main />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:postId" element={<ProductDetail />} />
              <Route
                path="/products/add"
                element={<AddProduct imageUploader={imageUploader} />}
              />
              <Route path="/carts" element={<Carts />} />
            </Route>
          </Routes>
        </UserRepositoryProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
