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
const Shop = lazy(() => import('./pages/Shop'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'))
// const Test = lazy(() => import('./pages/Admin Pages/Test'));
const PageLayout = lazy(() => import('./pages/PageLayout'));
const ListShoe = lazy(() => import('./pages/Admin Pages/Add'));


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
            <Route path='/' element={<PageLayout />}>
              <Route path='add-shoe' element={<ListShoe/>} />
              <Route path="home" element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
export default App
