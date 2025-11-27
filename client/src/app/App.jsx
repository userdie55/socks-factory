import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { useEffect, useState } from 'react';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';
import Footer from '../components/layout/Footer';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import ConfiguratorPage from '../pages/ConfiguratorPage/ConfiguratorPage';
import Cart from '../components/layout/Cart';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('/auth/refreshToken');
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      <Header user={user} setUser={setUser} setCartOpen={setCartOpen} />
      <Cart open={cartOpen} setOpen={setCartOpen} user={user} />

      {/* Контент растягивается, футер прижат вниз */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signUp" element={<SignUpPage setUser={setUser} />} />
          <Route path="/signIn" element={<SignInPage setUser={setUser} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/configurator" element={<ConfiguratorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
