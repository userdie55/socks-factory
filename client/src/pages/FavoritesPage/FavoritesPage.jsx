import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { getFavorites } from '../../services/favorites';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFavorites();
        setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800">Избранные товары</h1>

        {favorites.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-10 text-center shadow-md">
            <p className="text-gray-600 text-lg mb-6">У вас пока нет избранных товаров</p>

            <div className="flex justify-center">
              <Link
                to="/configurator"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold
                  shadow-md transition transform hover:scale-105 hover:shadow-xl hover:shadow-pink-400/40"
              >
                Создать свой идеальный дизайн
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <img src={item.image} alt={item.name} className="rounded-xl mb-4" />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price} ₽</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
