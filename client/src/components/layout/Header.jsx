import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

export default function Header({ user }) {
  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo + Desktop Menu */}
          <div className="flex items-center gap-8">

            {/* Mobile burger */}
            <div className="sm:hidden">
              <DisclosureButton className="rounded-md p-2 text-gray-500 hover:bg-gray-100 transition">
                <Bars3Icon className="size-6" />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="text-lg font-bold text-pink-500 hover:text-pink-600 transition"
            >
              SocksLab
            </Link>

            {/* Desktop menu */}
            <div className="hidden sm:flex gap-6 text-gray-700">
              <Link
                to="/configurator"
                className="px-3 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 transition"
              >
                Конфигуратор
              </Link>
            </div>
          </div>

          {/* RIGHT: Cart / Favorites / Profile */}
          <div className="flex items-center gap-4">

            <Link
              to="/cart"
              className="rounded-full p-1 text-gray-500 hover:text-gray-700 transition"
            >
              <ShoppingCartIcon className="size-6" />
            </Link>

            <Link
              to="/favorites"
              className="rounded-full p-1 text-gray-500 hover:text-gray-700 transition"
            >
              <HeartIcon className="size-6" />
            </Link>

            <Menu as="div" className="relative">
              <MenuButton className="rounded-full">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full"
                />
              </MenuButton>

              {/* User menus */}
              <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 border border-gray-100">

                {user ? (
                  <>
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Профиль
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/signOut"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Выйти
                      </Link>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link
                        to="/signUp"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Зарегистрироваться
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/signIn"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Войти
                      </Link>
                    </MenuItem>
                  </>
                )}
              </MenuItems>

            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <DisclosurePanel className="sm:hidden space-y-1 px-4 pb-3">
        <Link
          to="/configurator"
          className="block px-3 py-2 rounded-md bg-gray-100 text-gray-800"
        >
          Конфигуратор
        </Link>
      </DisclosurePanel>
    </Disclosure>
  );
}


// import { Link } from 'react-router-dom';

// export default function Header({user}) {
//   return (

//     <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
//       <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">

//         <Link
//           to="/"
//           className="text-lg font-bold text-pink-500 hover:text-pink-600 transition"
//         >
//           SocksLab
//         </Link>

//         <nav className="hidden md:flex gap-6 text-sm text-gray-600">
//           <span className="px-3 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition">
//             Конфигуратор
//           </span>
//           <span className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition">
//             Избранное
//           </span>
//           <span className="px-3 py-2 rounded-md hover:bg-lime-50 hover:text-lime-600 cursor-pointer transition">
//             Корзина
//           </span>
//         </nav>

//         {user ? (
//           <div className="flex items-center gap-4">
//             <span className="text-pink-500 font-medium">Привет, {user.name}</span>
//             <button
//               className="text-gray-500 hover:text-red-500 transition"
//               onClick={() => setUser(null)} /////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-4 text-sm text-gray-600">
//             <Link to="/signIn" className="hover:text-pink-500 transition">
//               Войти
//             </Link>
//             <Link to="/signUp" className="hover:text-blue-500 transition">
//               Зарегистрироваться
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
