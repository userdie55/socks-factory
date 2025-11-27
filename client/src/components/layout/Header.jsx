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
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';

export default function Header({ user, setCartOpen, setUser }) {
  const navigate = useNavigate();

  async function logoutHandler() {
    try {
      await axiosInstance.delete('/auth/signout');
      setAccessToken('');
      setUser(null);
      navigate('/signIn');
    } catch (err) {
      console.error('LOGOUT ERROR:', err);
    }
  }

  return (
    <Disclosure
      as="nav"
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
    >
      {({ open }) => (
        <>
          {/* TOP BAR */}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* MOBILE MENU BUTTON */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="group relative p-2 text-gray-400 hover:bg-white/5 hover:text-gray-700 rounded-md">
                  <Bars3Icon className="block size-6 group-data-open:hidden" />
                  <XMarkIcon className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>

              {/* LOGO */}
              <Link to="/" className="flex-shrink-0">
                <img src={logo} alt="logo" className="w-36 h-auto" />
              </Link>

              {/* DESKTOP MENU */}
              <div className="hidden sm:flex gap-6 text-gray-700">
                <Link
                  to="/configurator"
                  className="px-3 py-2 rounded-md hover:bg-pink-50 hover:text-pink-500 transition"
                >
                  Конфигуратор
                </Link>
              </div>

              {/* RIGHT SIDE ACTIONS */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto">

                {/* FAVORITES */}
                {user ? (
                  <Link
                    to="/favorites"
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <HeartIcon className="size-6" />
                  </Link>
                ) : (
                  <button
                    className="p-1 text-gray-600 hover:text-gray-800"
                    onClick={() => navigate('/signIn')}
                  >
                    <HeartIcon className="size-6" />
                  </button>
                )}

                {/* CART */}
                {user ? (
                  <button
                    onClick={() => setCartOpen(true)}
                    type="button"
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <ShoppingCartIcon className="size-6" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/signIn')}
                    type="button"
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <ShoppingCartIcon className="size-6" />
                  </button>
                )}

                {/* PROFILE MENU */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      className="size-8 rounded-full"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 py-1 z-50">

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
                          <button
                            onClick={logoutHandler}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Выйти
                          </button>
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

          {/* MOBILE MENU */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                to="/configurator"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Конфигуратор
              </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
