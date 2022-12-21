import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth, useLocalStorage } from './hooks';
import {
  publicRoutes,
  userRoutes,
  adminRoutes,
  employeeRoutes,
} from '~/routes';
import RequireAuth from './components/RequireAuth';
import { DefaultLayout, AdminLayout } from './layouts';
import { ROLE, LOCAL_STORAGE_KEY } from '~/utils/enum';
import Missing from './pages/Missing';

function App() {
  const { auth, setAuth } = useAuth();
  const { storedValue } = useLocalStorage(LOCAL_STORAGE_KEY, {});
  useEffect(() => {
    if (!auth?.user && storedValue) {
      setAuth(storedValue);
    }
  }, []);
  const createRoute = (routes, layout) => {
    return routes.map((route, index) => {
      const Page = route.component;
      const Layout = layout || DefaultLayout;
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  };
  return (
    <div className='App'>
      <Routes>
        {/*public route*/}
        {createRoute(publicRoutes)}
        {/*USER  route*/}
        <Route element={<RequireAuth allowedRoles={[ROLE.USER, ROLE.ADMIN]} />}>
          {createRoute(userRoutes)}
        </Route>
        {/*ADMIN  route*/}
        <Route
          path='/admin'
          element={<RequireAuth allowedRoles={[ROLE.ADMIN]} />}
        >
          {createRoute(adminRoutes, AdminLayout)}
        </Route>
        {/*Stroe employee route*/}
        <Route
          path='/employee'
          element={<RequireAuth allowedRoles={[ROLE.EMPLOYEE]} />}
        >
          {createRoute(employeeRoutes, AdminLayout)}
        </Route>
        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
