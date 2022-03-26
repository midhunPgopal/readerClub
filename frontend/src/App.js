import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtpLogin from './pages/OtpLogin'
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux'

function App() {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/login" element={ user ? <Navigate to='/'/> : <Login/>}/>
        <Route path="/otplogin" element={  user ? <Navigate to='/'/> : <OtpLogin/>}/>
        <Route path="/register" element={ user ? <Navigate to='/'/> : <Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
