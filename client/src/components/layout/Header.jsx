import { Link } from 'react-router-dom';

export default function Header({user}) {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-lg font-bold text-pink-500 hover:text-pink-600 transition"
        >
          SocksLab
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <span className="px-3 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition">
            Конфигуратор
          </span>
          <span className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition">
            Избранное
          </span>
          <span className="px-3 py-2 rounded-md hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition">
            Корзина
          </span>
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-pink-500 font-medium">Привет, {user.name}</span>
            <button
              className="text-gray-500 hover:text-red-500 transition"
              onClick={() => setUser(null)} /////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 text-sm text-gray-600">
            <Link to="/signIn" className="hover:text-pink-500 transition">
              Sign In
            </Link>
            <Link to="/signUp" className="hover:text-blue-500 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
