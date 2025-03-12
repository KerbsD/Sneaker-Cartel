import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="max-w-72 mx-auto flex flex-col font-outfit h-[95vh] p-2">
      <Outlet />
    </div>
  );
}

export default AuthLayout;