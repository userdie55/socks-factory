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

import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header({ user, setCartOpen }) {
  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
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

            {/* Logo */}
            <Link to="/">
              <img
                alt=""
                src={logo}
                className="w-36 h-auto"
              />
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
