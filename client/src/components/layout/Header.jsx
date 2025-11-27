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

export default function Header({ user, setCartOpen }) {
  return (
    <Disclosure as="nav" className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <Link
          to="/"
          className="text-lg font-bold text-pink-500 hover:text-pink-600 transition"
        >
          SocksLab
        </Link>

            {/* DESKTOP MENU */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/configurator"
                  aria-current="page"
                  className="px-3 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 cursor-pointer transition"
                >
                  Конфигуратор
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT BLOCK: Cart, Favorites, Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Cart */}
            <button
             
              onClick={() => setCartOpen(true)}
              type="button"
              className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Cart</span>
              <ShoppingCartIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              type="button"
              className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Favorites</span>
              <HeartIcon aria-hidden="true" className="size-6" />
            </Link>

            {/* Profile menu */}

            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              {user ? (
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Профиль
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/signOut"
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Выйти
                    </Link>
                  </MenuItem>
                </MenuItems>
              ) : (
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition"
                >
                  <MenuItem>
                    <Link
                      to="/signUp"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Зарегистрироваться
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/signIn"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Войти
                    </Link>
                  </MenuItem>
                </MenuItems>
              )}
            </Menu>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            as="a"
            href="#"
            aria-current="page"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Конфигуратор
          </DisclosureButton>
        </div>
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
