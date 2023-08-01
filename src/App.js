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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageUploader from "./service/cloudinary/image-uploader";
import ProductRepository from "./service/firebase/product-repository";

const imageUploader = new ImageUploader();
const productRepository = new ProductRepository();

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <UserRepositoryProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  path="/"
                  element={<Main productRepository={productRepository} />}
                />
                <Route
                  path="/products"
                  element={<Products productRepository={productRepository} />}
                />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail />}
                />
                <Route
                  path="/products/add"
                  element={
                    <AddProduct
                      imageUploader={imageUploader}
                      productRepository={productRepository}
                    />
                  }
                />
                <Route
                  path="/carts"
                  element={<Carts productRepository={productRepository} />}
                />
              </Route>
            </Routes>
          </QueryClientProvider>
        </UserRepositoryProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
