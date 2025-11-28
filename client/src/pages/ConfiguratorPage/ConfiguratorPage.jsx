import { useState } from 'react';
import sockImg from '../../assets/socks.png';
import { axiosInstance } from '../../shared/lib/axiosInstance';

export default function ConfiguratorPage() {
  // состояние оставляем как есть
  const [colorHex, setColorHex] = useState('#ff7bcb');
  const [selectedPatternId, setSelectedPatternId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [emojiPreview, setEmojiPreview] = useState(null);

  function resetAll() {
    setColorHex('#ffffff');
    setSelectedPatternId(null);
    setSelectedImageId(null);
    setEmojiPreview(null);
  }

  // формируем единый json-дизайн
  function getDesignPayload() {
    return {
      color: colorHex,
      pattern: selectedPatternId,
      image: selectedImageId,
      emoji: emojiPreview,
      // можно расширять позже
    };
  }

  // ⭐ Добавить в избранное
  async function addToFavorites() {
    try {
      const payload = getDesignPayload();

      console.log('FAV PAYLOAD:', payload);

      await axiosInstance.post('/favorites', payload);

      alert('Добавлено в избранное!');
    } catch (error) {
      console.log(error);
      alert('Ошибка при добавлении в избранное');
    }
  }

  // 🛒 Добавить в корзину
  async function addToCart() {
    try {
      const payload = getDesignPayload();

      console.log('CART PAYLOAD:', payload);

      await axiosInstance.post('/cart', payload);

      alert('Добавлено в корзину!');
    } catch (error) {
      console.log(error);
      alert('Ошибка при добавлении в корзину');
    }
  }

  // ---------- PATTERN LAYER ----------
  function PatternFill({ pattern }) {
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

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-10">
      <div className="max-w-7xl w-full bg-white/50 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT — ИЗОБРАЖЕНИЯ */}
          <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center h-[520px]">
            <h2 className="text-2xl font-semibold mb-8 text-gray-700">Изображения</h2>

            <div className="grid grid-cols-2 gap-5">
              {[
                { emoji: '⭐', id: 2 },
                { emoji: '🔥', id: 1 },
                { emoji: '🌈', id: 3 },
                { emoji: '🍀', id: 4 },
                { emoji: '💎', id: 5 },
                { emoji: '⚽', id: 6 },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedImageId(item.id);
                    setEmojiPreview(item.emoji);
                  }}
                  className={`cursor-pointer text-5xl p-5 rounded-xl border transition 
                    ${
                      selectedImageId === item.id
                        ? 'bg-pink-100 border-pink-400'
                        : 'bg-white border-gray-300'
                    }`}
                >
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — НОСОК */}
          <div className="flex flex-col items-center justify-start">
            <div className="relative w-[350px] h-[420px]">
              {/* ОСНОВНОЙ ЦВЕТ */}
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${sockImg})`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  backgroundColor: colorHex,
                }}
              />

              {/* PATTERN */}
              <PatternFill pattern={selectedPatternId} />

              {/* EMOJI */}
              {emojiPreview && (
                <div
                  className="absolute text-5xl select-none pointer-events-none"
                  style={{
                    top: '18%',
                    left: '43%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {emojiPreview}
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-5">
              <button
                onClick={addToCart}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                В корзину
              </button>

              <button
                onClick={addToFavorites}
                className="px-8 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                В избранное
              </button>
            </div>
          </div>

          {/* RIGHT — ЦВЕТ + УЗОРЫ */}
          <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-md h-[520px] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Цвет</h2>

              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
              />

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Узоры</h2>

              <div className="flex gap-4 flex-wrap">
                {[
                  { id: 1, title: 'Горошек' },
                  { id: 2, title: 'Полосы' },
                  { id: 3, title: 'Авторский' },
                  { id: 4, title: 'Салют' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatternId(p.id)}
                    className={`px-6 py-3 rounded-xl border text-lg transition ${
                      selectedPatternId === p.id
                        ? 'bg-pink-100 border-pink-400'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={resetAll}
              className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition"
            >
              Сбросить
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
