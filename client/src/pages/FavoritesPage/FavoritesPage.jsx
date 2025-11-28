// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// // import { getFavorites } from '../../services/favorites';

// export default function FavoritesPage() {
//   const [favorites, setFavorites] = useState([]);

//   // useEffect(() => {
//   //   (async () => {
//   //     try {
//   //       const data = await getFavorites();
//   //       setFavorites(Array.isArray(data.favorites) ? data.favorites : []);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   })();
//   // }, []);

//   return (
//     <div className="min-h-screen pt-20">
//       <div className="mx-auto max-w-4xl px-6 py-10">
//         <h1 className="text-3xl font-semibold mb-8 text-gray-800">Избранные товары</h1>

//         {favorites.length === 0 ? (
//           <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-10 text-center shadow-md">
//             <p className="text-gray-600 text-lg mb-6">У вас пока нет избранных товаров</p>

//             <div className="flex justify-center">
//               <Link
//                 to="/configurator"
//                 className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold
//                   shadow-md transition transform hover:scale-105 hover:shadow-xl hover:shadow-pink-400/40"
//               >
//                 Создать свой идеальный дизайн
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favorites.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
//               >
//                 <img src={item.image} alt={item.name} className="rounded-xl mb-4" />
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">{item.price} ₽</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import sockImg from '../../assets/socks.png';
import { getPatternTitle } from '../../shared/constants/patterns';
import namer from 'color-namer';

function getColorName(hex) {
  try {
    const result = namer(hex).ntc;
    return result[0].name;
  } catch {
    return hex;
  }
}

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

        <p className="text-gray-600 text-lg mb-6">Вы пока не сделали свои лучшие носки</p>

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

  // ---------- ФУНКЦИЯ ОТОБРАЖЕНИЯ ПАТТЕРНА ----------
  function PatternPreview({ pattern }) {
    if (!pattern) return null;

    const darker = 'rgba(0, 0, 0, 0.85)';

    const patternBg = {
      1: `radial-gradient(circle, ${darker} 25%, transparent 26%) 0 0 / 22px 22px`,
      2: `repeating-linear-gradient(0deg, ${darker} 0 7px, transparent 7px 14px)`,
      3: `
        radial-gradient(circle at top left, ${darker} 30%, transparent 32%) 0 0 / 34px 34px,
        radial-gradient(circle at bottom right, ${darker} 30%, transparent 32%) 0 0 / 34px 34px
      `,
      4: `
        repeating-conic-gradient(
          from 0deg,
          ${darker} 0deg 10deg,
          transparent 10deg 40deg
        ) 50% / 80px 80px
      `,
    };

    return (
      <div
        className="absolute inset-0"
        style={{
          background: patternBg[pattern],
          opacity: 0.4,
          WebkitMaskImage: `url(${sockImg})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
        }}
      />
    );
  }

  // ---------- ОСНОВНОЙ РЕНДЕР ----------
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Избранное</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {favorites.map((fav) => {
          const design = fav.SocksDesign.design_json;

          return (
            <div
              key={fav.id}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center"
            >
              <div className="relative w-[200px] h-[250px] mb-6">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: design.color,
                    WebkitMaskImage: `url(${sockImg})`,
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',
                  }}
                />

                <PatternPreview pattern={design.pattern} />

                {design.emoji && (
                  <div
                    className="absolute text-4xl"
                    style={{
                      top: '18%',
                      left: '43%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {design.emoji}
                  </div>
                )}
              </div>

              <div className="text-gray-700 mb-4">
                <p>
                  <b>Цвет:</b> {getColorName(design.color)}
                </p>
                <p>
                  <b>Паттерн:</b> {getPatternTitle(design.pattern)}
                </p>
                <p>
                  <b>Картинка:</b> {design.emoji ?? '-'}
                </p>
              </div>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/design/${fav.SocksDesign.id}`,
                  )
                }
                className="px-6 py-2 rounded-xl bg-blue-400 text-white font-semibold shadow hover:bg-blue-500 transition"
              >
                Поделиться
              </button>
              <button
                onClick={() => removeFavorite(fav.id)}
                className="px-6 py-2 rounded-xl bg-red-400 text-white font-semibold shadow hover:bg-red-500 transition"
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
