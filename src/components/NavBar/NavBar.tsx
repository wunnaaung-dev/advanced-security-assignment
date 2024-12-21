import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-200 w-full py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold text-blue-800">Brilliant Portal</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-blue-900 font-semibold' : 'text-slate-500 hover:text-blue-900 font-medium')}
          >
            Register
          </NavLink>
            <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'text-blue-900 font-semibold' : 'text-slate-500 hover:text-blue-900 font-medium')}
            >
            Login
            </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
