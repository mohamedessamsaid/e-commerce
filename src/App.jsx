import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Componets/Layout/Layout';
import Home from './Componets/Home/Home';
import Products from './Componets/Products/Products';
import Categories from './Componets/Categories/Categories';
import Brands from './Componets/Brands/Brands';
import Cart from './Componets/Cart/Cart';
import NotFound from './Componets/NotFound/NotFound'
import Register from './Componets/Register/Register'
import Login from './Componets/Login/Login'
import Protect from './Componets/Protect/Protect';
import UserContextProvider from './Context/userContext';
import CartContextProvider from './Context/cartContext';
import ProductDetailes from './Componets/ProductDetailes/ProductDetailes';
import { Toaster } from 'react-hot-toast';
import CategoryDetailes from './Componets/CategoryDetailes/CategoryDetailes';
import BrandDetailes from './Componets/BrandDetailes/BrandDetailes';
import CashPay from './Componets/Payment/CashPay';
import OnlinePayment from './Componets/Payment/OnlinePayment';
import ForgorPassword from './Componets/ForgorPassword/ForgorPassword';
import VerifyPassword from './Componets/VerifyPassword/VerifyPassword';
import ResetPassword from './Componets/ResetPassword/ResetPassword';
import Wishlist from './Componets/Wishlist/Wishlist';
import Allorders from './Componets/Allorders/Allorders';

function App() {

  let Routes = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: 'home', element: <Protect> <Home /> </Protect> },
        { path: '', element: <Protect> <Home /> </Protect> },
        { path: 'products', element: <Protect> <Products /> </Protect> },
        { path: 'Categories', element: <Protect> <Categories /> </Protect> },
        { path: 'Brands', element: <Protect> <Brands /> </Protect> },
        { path: 'Cart', element: <Protect> <Cart /> </Protect> },
        { path: 'productDetailes/:id', element: <Protect> <ProductDetailes /> </Protect> },
        { path: 'categoryDetailes/:id', element: <Protect> <CategoryDetailes /> </Protect> },
        { path: 'brandDetailes/:id', element: <Protect> <BrandDetailes /> </Protect> },
        { path: '/ForgorPassword', element: <ForgorPassword />  },
        { path: '/VerifyPassword', element: <VerifyPassword />  },
        { path: '/ResetPassword', element: <ResetPassword />  },
        { path: 'OnlinePayment/:id', element: <Protect> <OnlinePayment /> </Protect> },
        { path: 'Wishlist', element: <Protect> <Wishlist /> </Protect> },
        { path: 'allorders', element: <Protect> <Allorders /> </Protect> },
        { path: 'CashPay/:id', element: <Protect> <CashPay /> </Protect> },
        { path: 'Register', element: <Register /> },
        { path: 'Login', element: <Login /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])
  return <>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </UserContextProvider>
      <Toaster/>
    </CartContextProvider>

  </>
}

export default App;
