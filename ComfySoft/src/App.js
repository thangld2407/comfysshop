import './assets/scss/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <Routes>
      <Route path="/products" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
