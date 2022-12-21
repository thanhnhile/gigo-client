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
import AddProduct from '../components/Form/AddProduct';
import AddCategory from '../components/Form/AddCategory';
import AddStore from '../components/Form/AddStore';
import AddEmployee from '../components/Form/AddEmployee';
import EditProduct from '../components/Form/EditProduct';
import EditCategory from '../components/Form/EditCategory';
import EditStore from '../components/Form/EditStore';
import EditEmployee from '../components/Form/EditEmployee';

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
    path: '/admin/products/add',
    component: AddProduct,
  },
  {
    path: '/admin/products/edit/:id',
    component: EditProduct,
  },

  {
    path: '/admin/categories',
    component: Category,
  },
  {
    path: '/admin/categories/add',
    component: AddCategory,
  },
  {
    path: '/admin/categories/edit/:id',
    component: EditCategory,
  },

  {
    path: '/admin/stores',
    component: Store,
  },
  {
    path: '/admin/stores/add',
    component: AddStore,
  },
  {
    path: '/admin/stores/edit/:id',
    component: EditStore,
  },

  {
    path: '/admin/employees',
    component: Employee,
  },
  {
    path: '/admin/employees/add',
    component: AddEmployee,
  },
  {
    path: '/admin/employees/edit/:id',
    component: EditEmployee,
  },
];
