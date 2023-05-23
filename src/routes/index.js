/*public */
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/Password/ForgotPassword';
import ResetPassword from '../pages/Password/ResetPassword';
import Register from '../pages/Register';
import ProductDetail from '../pages/ProductDetail';
import Stores from '../pages/Store';
import Checkout from '../pages/Checkout';
import SearchResult from '../pages/SearchResult';
import Menu from '../pages/Menu';
import About from '../pages/About';
import Contact from '../pages/Contact';
import News from '~/pages/News';

/*user */
import Personal from '../pages/Personal';
import ListCustomerInfo from '../pages/ListCustomerInfo';
import ListProductLiked from '../pages/ListProductLiked';

/*admin */
import Dashboard from '../pages/Admin/Dashboard';
import Product from '../pages/Admin/Table/Product';
import Category from '../pages/Admin/Table/Category';
import Store from '../pages/Admin/Table/Store';
import Employee from '../pages/Admin/Table/Employee';
import Voucher from '../pages/Admin/Table/Voucher';
import CreateOrUpdateProduct from '../pages/Admin/Form/Product';
import CreateOrUpdateCategory from '../pages/Admin/Form/Category';
import CreateOrUpdateStore from '../pages/Admin/Form/Store';
import CreateOrUpdateEmployee from '../pages/Admin/Form/Employee';
import CreateOreUpdateVoucher from '../pages/Admin/Form/Voucher';

/*store employee */
import ManageOrders from '../pages/Employee/ManageOrders';
import Invoice from '../pages/Employee/Invoice';
import { default as EmployeeDashboard } from '../pages/Employee/Dashboard';

import { PERMISSION } from '~/utils/enum';

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
    path: '/forgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/resetPassword/:token',
    component: ResetPassword,
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
  {
    path: '/customer-info',
    component: ListCustomerInfo,
  },
  {
    path: '/productsLiked-info',
    component: ListProductLiked,
  },
  {
    path: '/orders/:id',
    component: Invoice,
    permission: [PERMISSION.CANCEL],
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
    path: '/admin/products/:id',
    component: CreateOrUpdateProduct,
  },

  {
    path: '/admin/categories',
    component: Category,
  },
  {
    path: '/admin/categories/:id',
    component: CreateOrUpdateCategory,
  },

  {
    path: '/admin/stores',
    component: Store,
  },
  {
    path: '/admin/stores/:id',
    component: CreateOrUpdateStore,
  },

  {
    path: '/admin/employees',
    component: Employee,
  },
  {
    path: '/admin/employees/:id',
    component: CreateOrUpdateEmployee,
  },

  {
    path: '/admin/vouchers',
    component: Voucher,
  },
  {
    path: '/admin/vouchers/:id',
    component: CreateOreUpdateVoucher,
  },
];
export const employeeRoutes = [
  {
    path: '/employee',
    component: EmployeeDashboard,
  },
  {
    path: '/employee/orders',
    component: ManageOrders,
  },
  {
    path: '/employee/orders/:id',
    component: Invoice,
    permission: [...PERMISSION.ALL],
  },
];
