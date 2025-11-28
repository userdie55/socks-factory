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
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ user, setCartOpen }) {
  const navigate = useNavigate();

  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile menu */}
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

          {/* LEFT — LOGO */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="w-36 h-auto" />
            </Link>
          </div>

          {/* CENTER — MENU */}
          <div className="hidden sm:flex flex-1 justify-center">
            <Link
              to="/configurator"
              className="px-4 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 transition cursor-pointer text-lg"
            >
              Конструктор
            </Link>
          </div>

          {/* RIGHT — ICONS + PROFILE */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Favorites + Cart */}
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="p-1 text-gray-400 hover:text-pink-500"
                >
                  <HeartIcon className="size-6" />
                </Link>

                <button
                  onClick={() => setCartOpen(true)}
                  className="p-1 text-gray-400 hover:text-pink-500"
                >
                  <ShoppingCartIcon className="size-6" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signIn"
                  className="p-1 text-gray-400 hover:text-pink-500"
                >
                  <HeartIcon className="size-6" />
                </Link>

                <button
                  onClick={() => navigate('/signIn')}
                  className="p-1 text-gray-400 hover:text-pink-500"
                >
                  <ShoppingCartIcon className="size-6" />
                </button>
              </>
            )}

            {/* PROFILE DROPDOWN */}
            <Menu as="div" className="relative">
              <MenuButton className="relative flex rounded-full">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              {user ? (
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white 
                             py-1 shadow-lg outline outline-black/5 transition"
                >
                  <MenuItem>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Профиль
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/signOut"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                    >
                      Выйти
                    </Link>
                  </MenuItem>
                </MenuItems>
              ) : (
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white 
                             py-1 shadow-lg outline outline-black/5 transition"
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

      {/* MOBILE PANEL */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            as={Link}
            to="/configurator"
            className="block rounded-md px-3 py-2 text-base font-medium bg-gray-900 text-white"
          >
            Конструктор
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
