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
import Product from '../components/Table/Product';
import Category from '../components/Table/Category';
import Store from '../components/Table/Store';
import Employee from '../components/Table/Employee';
import AddProduct from '../components/Form/Product';
import AddCategory from '../components/Form/Category';
import AddStore from '../components/Form/Store';
import AddEmployee from '../components/Form/Employee';

/*store employee */
import ManageOrders from '../pages/Employee/ManageOrders';

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
  {
    path: '/personal',
    component: Personal,
  },
];
export const adminRoutes = [
  {
    path: '/admin',
    component: Dashboard,
  },
  {
    path: '/admin/products',
    component: Product,
  },
  {
    path: '/admin/categories',
    component: Category,
  },
  {
    path: '/admin/stores',
    component: Store,
  },
  {
    path: '/admin/employees',
    component: Employee,
  },
  {
    path: '/admin/products/add',
    component: AddProduct,
  },
  {
    path: '/admin/categories/add',
    component: AddCategory,
  },
  {
    path: '/admin/stores/add',
    component: AddStore,
  },
  {
    path: '/admin/employees/add',
    component: AddEmployee,
  },
];
export const employeeRoutes = [
  {
    path: '/employee',
    component: Dashboard,
  },
  {
    path: '/employee/orders',
    component: ManageOrders,
  },
];
