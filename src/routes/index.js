import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import Stores from '../pages/Store';
import Checkout from '../pages/Checkout';
import Unauthorized from '../pages/Unauthorized';
import SearchResult from '../pages/SearchResult';
import Personal from '../pages/Personal';
import Menu from "../pages/Menu";
export const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/products/:id',
    component: ProductDetail,
  },
  {
    path: '/stores/',
    component: Stores,
  },
  {
    path: "/menu/:id",
    component: Menu
  },
  {
    path: '/checkout/',
    component: Checkout,
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
  },
  {
    path: '/search',
    component: SearchResult,
  },
];

//Required login
export const userRoutes = [
  {
    path: '/personal',
    component: Personal,
  },
];
export const adminRoutes = [];
