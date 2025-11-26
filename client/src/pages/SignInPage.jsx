import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Войти</h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const savedUser = JSON.parse(localStorage.getItem('user'));
            if (savedUser) {
              setUser(savedUser);
            } else {
              setUser({ email });
            }
            navigate('/');
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-pink-400 outline-none shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-pink-400 outline-none shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
