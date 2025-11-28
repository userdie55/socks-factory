import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen px-6 py-14 bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col items-center">

      {/* GREETING */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Привет, {user?.name} 
      </h1>

      {/* USER CARD */}
      <div className="bg-white max-w-xl w-full p-8 rounded-3xl shadow-xl border border-gray-200 mb-12">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Личная информация
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <b className="mr-2">Имя:</b> {user?.name}
          </p>

          <p>
            <b className="mr-2">Email:</b> {user?.email}
          </p>

          <p>
            <b className="mr-2">Аккаунт создан:</b>  Сегодня 
          </p>
        </div>
      </div>

      {/* DASHBOARD BUTTONS */}
      <div className="grid grid-cols-3 gap-6 max-w-xl w-full mb-12">
        <a
          href="/favorites"
          className="bg-white border border-gray-200 rounded-2xl shadow-md py-5 text-center hover:shadow-lg transition"
        >
          ❤️ <br /> Избранное
        </a>

        <a
          href="/cart"
          className="bg-white border border-gray-200 rounded-2xl shadow-md py-5 text-center hover:shadow-lg transition"
        >
          🛒 <br /> Корзина
        </a>

        <a
          href="/configurator"
          className="bg-white border border-gray-200 rounded-2xl shadow-md py-5 text-center hover:shadow-lg transition"
        >
          🎨 <br /> Конфигуратор
        </a>
      </div>

      {/* ORDERS */}
      <div className="bg-white max-w-xl w-full p-8 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          История заказов
        </h2>

        <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-center text-gray-500">
          У вас пока нет заказов 
        </div>
      </div>
    </div>
  );
}
