import { createBrowserRouter } from "react-router";
import App from "../../App";
import Home from "../pages/Home/Home/Home";
import Cart from "../pages/cart/cart";
import Products from "../pages/products/products/Products";
import Login from '../pages/shared/login/Login';
import Registration from "../pages/shared/refistration/Registration";
import ForgetPassWord from "../pages/shared/ForgetPassword/ForgetPassWord";

import ProtectedRoute from "../component/protected/ProtectedRoute";
import AdminLaout from "../pages/admin/AdminLayout/AdmiinLaout";
import DashBoard from "../pages/admin/DashBoard";
import Addcategory from "../pages/admin/ProductCategory/Addcategory";
import GetAllUser from "../pages/admin/GetAlluser/GetAllUser";
import Categories from "../pages/Home/Categories/Categories";
import AddProduct from "../pages/admin/product/AddProduct";
import UpdateProduct from "../pages/admin/product/UpdateProduct";
import ProductDetails from "../pages/products/products/ProductsDetails";
import ProductsByCategory from "../pages/products/products/ProductsByCategory";
import UpdateCategories from "../pages/admin/ProductCategory/UpdateCategory";
import AboutUs from './../pages/Home/About Us/AboutUs';
import Checkout from "../pages/chekout/Checkout";
import PaymentCancel from "../pages/paymenCallback/PaymentFail";
import PaymentSuccess from "../pages/paymenCallback/PaymentSuccess";
import Orders from "../pages/orders/Orders";



export const router = createBrowserRouter([
  {
    path: "/",
   element:<App/>,
   children:[
    {
        path:'/',
        element:<Home/>,
    },
    {
      path:'products',
      element:<Products/>

    },
    {
      path:'products/:id',
      element:<ProductDetails/>

    },
    {
      path:'getProductsByCategory/:categoryName',
      element:<ProductsByCategory/>

    },
    {
      path:'categories',
      element:<Categories/>

    },
    {
      path:'cart',
      element:<Cart/>

    },
    {
      path:'checkout',
      element:<Checkout/>

    },
    {
      path:'payment-cancel',
      element:<PaymentCancel/>

    },
    {
      path:'payment-success',
      element:<PaymentSuccess/>

    },
    {
      path:'about',
      element:<AboutUs/>

    },
    {
      path:'order',
      element:<Orders/>

    },
    {
      path:'getProductsByCategory/:categoryName',
      element:<ProductsByCategory/>

    }
   ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/registartion',
    element:<Registration/>
  },
  {
    path:'/forgetpassword',
    element:<ForgetPassWord/>
  },
  {
   path: "/admin",
   element: <ProtectedRoute role="ADMIN"><AdminLaout/></ProtectedRoute>,
   children:[
      {
        path:'',
        element:<ProtectedRoute role="ADMIN"><DashBoard/></ProtectedRoute>
      },
      {
        path:'add-category',
        element:<ProtectedRoute role="ADMIN"><Addcategory/></ProtectedRoute>
      },
      {
        path:'get-all_User',
        element:<ProtectedRoute role="ADMIN"><GetAllUser/></ProtectedRoute>
      },
      {
        path:'get_all_categories',
        element:<ProtectedRoute role="ADMIN"><UpdateCategories/></ProtectedRoute>
      },
      {
        path:'update_categories',
        element:<ProtectedRoute role="ADMIN"><UpdateCategories/></ProtectedRoute>
      },
      {
        path:'add-product',
        element:<ProtectedRoute role="ADMIN"><AddProduct/></ProtectedRoute>
      },
      {
        path:'get-all-products',
        element:<ProtectedRoute role="ADMIN"><UpdateProduct/></ProtectedRoute>
      }
   ]
  },
]);