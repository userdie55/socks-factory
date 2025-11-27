import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { useEffect, useState } from 'react';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';
import Footer from '../components/layout/Footer';
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
    <div>
      <Header user={user} setCartOpen={setCartOpen} />
      <Cart open={cartOpen} setOpen={setCartOpen} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage setUser={setUser} />} />
        <Route path="/signIn" element={<SignInPage setUser={setUser} />} />
      </Routes>

      <Footer />
    </div>
  );
}
