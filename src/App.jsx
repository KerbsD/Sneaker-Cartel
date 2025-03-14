import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
const Layout = lazy(() => import('./pages/Layout'));
const AuthLayout = lazy(() => import('./pages/Auth/AuthLayout'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const Missing = lazy(() => import('./pages/Missing'));
const PersistLogin = lazy(() => import('./pages/helpers/PersistLogin'));
const RequireAuth = lazy(() => import('./pages/helpers/RequireAuth'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'))

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<AuthLayout />} >
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route index path="/home" element={<Home />} />
            <Route index path="/shop" element={<Shop />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
export default App
