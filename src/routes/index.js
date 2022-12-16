/*public */
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import Stores from '../pages/Store';
import Checkout from '../pages/Checkout';
import Unauthorized from '../pages/Unauthorized';
import SearchResult from '../pages/SearchResult';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Contact from '../pages/Contact';
import News from '../pages/News';

/*user */
import Personal from '../pages/Personal';

/*admin */
import Dashboard from '../pages/Admin/Dashboard';

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
    path: '/menu/:id',
    component: Menu,
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
  {
    path: '/about',
    component: About,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
];

//Required login
export const userRoutes = [
  //personal
];
export const adminRoutes = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  // },
];
