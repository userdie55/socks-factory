import { useEffect, useState } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosInstance.get('/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  async function removeFavorite(id) {
    await axiosInstance.delete(`/favorites/${id}`);
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }

  // ---------- ПУСТОЕ ИЗБРАННОЕ ----------
  if (favorites.length === 0) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-6">Избранное</h1>

        <p className="text-gray-600 text-lg mb-6">
          Здесь появятся носки, которые вы добавите в избранное
        </p>

        <a
          href="/configurator"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                     text-white font-semibold shadow-md hover:scale-105 transition"
        >
          Перейти в конфигуратор
        </a>
      </div>
    );
  }

  // ---------- ОСНОВНОЙ РЕНДЕР ----------
  return (
    <div className="flex flex-1 flex-col p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Избранное</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {favorites.map((fav) => {
          const design = fav.SocksDesign;

          return (
            <div
              key={fav.id}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center"
            >
              {/* Картинка носка из конструктора */}
              <img
                src={design.preview}
                alt="sock"
                className="w-[200px] h-auto rounded-xl shadow mb-6"
              />

              <div className="text-gray-700 text-center mb-4">
                <p><b>Цвет:</b> {design.colorHex}</p>
                <p><b>Узор:</b> {design.patternName || '-'}</p>
                <p><b>Emoji:</b> {design.image || '-'}</p>
              </div>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/design/${design.id}`
                  )
                }
                className="px-6 py-2 rounded-xl bg-blue-400 text-white font-semibold shadow hover:bg-blue-500 transition"
              >
                Поделиться
              </button>

              <button
                onClick={() => removeFavorite(fav.id)}
                className="mt-2 px-6 py-2 rounded-xl bg-red-400 text-white font-semibold shadow hover:bg-red-500 transition"
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
