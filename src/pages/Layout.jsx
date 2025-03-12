import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <section className='md:max-w-6xl mx-auto'>
        <Outlet />
    </section>
  );
}

export default Layout;