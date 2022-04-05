import Cart from "./pages/User/Cart";
import Home from "./pages/User/Home";
import Login from "./pages/Auth/Login";
import OtpLogin from './pages/Auth/OtpLogin'
import Product from "./pages/User/Product";
import ProductList from "./pages/User/ProductList";
import Register from "./pages/Auth/Register";
import Payment from "./pages/User/Payment";
import Orders from "./pages/User/Orders";
import AdminHome from "./pages/Admin/AdminHome";
import AdminLogin from "./pages/AdminAuth/AdminLogin";
import EditProduct from "./pages/ProductManagement/EditProduct";
import AdminCategory from "./pages/categoryManagement/AdminCategory";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import AdminProduct from "./pages/ProductManagement/AdminProduct";
import EditCategory from "./pages/categoryManagement/EditCategory";
import AdminOrder from "./pages/OrderManagement/AdminOrder";
import EditOrder from './pages/OrderManagement/EditOrder'

function App() {

  const user = useSelector((state) => state.user.currentUser)
  const admin = useSelector(state => state.admin.currentAdmin)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ user ? <Navigate to='/'/> : <Register/>}/>
        <Route path="/login" element={ user ? <Navigate to='/'/> : <Login/>}/>
        <Route path="/otplogin" element={ user ? <Navigate to='/'/> : <OtpLogin/>}/>
        <Route exact path="/" element={user ? <Home/>  : <Navigate to='/login'/>}/>
        <Route path="/products" element={user ? <ProductList/> : <Navigate to='/login'/>}/>
        <Route path="/products/:category" element={user ? <ProductList/> : <Navigate to='/login'/>}/>
        <Route path="/product/:id" element={ user ? <Product/> : <Navigate to='/login'/>}/>
        <Route path="/cart" element={user ? <Cart/> : <Navigate to='/login'/>}/>
        <Route path="/orders" element={user ? <Orders/> : <Navigate to='/login'/>}/>
        <Route path='/payment' element= {user ? <Payment/> : <Navigate to='/login'/>}/>

        {/* Admin routes */}

        <Route exact path="/admin" element={admin ? <AdminHome/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/adminlogin" element={ admin ? <Navigate to='/admin'/> : <AdminLogin/>}/>
        <Route path="/editproduct/:id" element={admin ? <EditProduct/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/viewproduct/:id" element={admin ? <AdminProduct/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/admincategory" element={admin ? <AdminCategory/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/editcategory/:id" element={admin ? <EditCategory/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/adminorder" element={admin ? <AdminOrder/> : <Navigate to='/adminlogin'/>}/>
        <Route path="/editorder/:id" element={admin ? <EditOrder/> : <Navigate to='/adminlogin'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
