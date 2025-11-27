import { useState } from 'react';
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  function onChangeHandler(event) {
    return setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function registrationHandler(event) {
    try {
      event.preventDefault();

      const response = await axiosInstance.post(
        'http://localhost:3000/api/auth/signup',
        inputs,
      );

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);

      navigate('/');
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Sign Up</h2>

        <form className="flex flex-col gap-4" onSubmit={registrationHandler}>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-blue-400 outline-none shadow-sm"
            name="name"
            onChange={onChangeHandler}
          />

          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-pink-400 outline-none shadow-sm"
            name="email"
            onChange={onChangeHandler}
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-purple-400 outline-none shadow-sm"
            name="password"
            onChange={onChangeHandler}
          />

          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold
           shadow-md transition transform hover:scale-105 hover:shadow-xl hover:shadow-pink-400/40"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
