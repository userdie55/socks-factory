import { useState } from 'react';
import sockImg from '../../assets/socks.png';

export default function ConfiguratorPage() {
  const [color, setColor] = useState('#ff7bcb');
  const [pattern, setPattern] = useState(null);
  const [image, setImage] = useState(null);

  function resetAll() {
    setColor('#ffffffff');
    setPattern(null);
    setImage(null);
  }

  // ---------- PATTERN FILL LAYER ----------
  function PatternFill({ pattern }) {
    if (!pattern) return null;

    const darker = 'rgba(0, 0, 0, 0.9)';

    const patternBg = {
      dots: `
        radial-gradient(circle, ${darker} 25%, transparent 26%) 0 0 / 22px 22px
      `,
      stripes: `
        repeating-linear-gradient(
          0deg,
          ${darker} 0px,
          ${darker} 7px,
          transparent 7px,
          transparent 14px
        )
      `,
      hearts: `
        radial-gradient(circle at top left, ${darker} 30%, transparent 32%) 0 0 / 34px 34px,
        radial-gradient(circle at bottom right, ${darker} 30%, transparent 32%) 0 0 / 34px 34px
      `,
      waves: `
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
          paddingTop: '10%',
          paddingBottom: '10%',
          background: patternBg[pattern],
          opacity: 0.45,
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
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT — IMAGES */}
          <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center h-[520px]">
            <h2 className="text-2xl font-semibold mb-8 text-gray-700">Изображения</h2>

            <div className="grid grid-cols-2 gap-5">
              {['⭐', '🔥', '🌈', '🍀', '💎', '⚽'].map((item) => (
                <div
                  key={item}
                  onClick={() => setImage(item)}
                  className={`cursor-pointer text-5xl p-5 rounded-xl border transition 
        ${image === item ? 'bg-pink-100 border-pink-400' : 'bg-white border-gray-300'}
      `}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — BIG SOCK */}
          <div className="flex flex-col items-center justify-start">
            <div className="relative w-[350px] h-[420px]">
              {/* BG GRADIENT */}
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  background: 'linear-gradient(135deg, #2c4bd35e, #31080818)',
                  borderRadius: '20px',
                }}
              />

              {/* MAIN COLOR */}
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${sockImg})`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  backgroundColor: color,
                }}
              />

              {/* PATTERN */}
              <PatternFill pattern={pattern} />

              {/* EMOJI */}
              {image && (
                <div
                  className="absolute text-5xl select-none pointer-events-none"
                  style={{
                    top: '18%',
                    left: '43%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {image}
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-4">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition">
                В корзину
              </button>

              <button className="px-8 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition">
                В избранное
              </button>
            </div>
          </div>

          {/* RIGHT — COLORS & PATTERNS */}
          <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 shadow-md h-[520px] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Цвета</h2>

              <input
                type="color"
                className="w-20 h-12 mb-10 cursor-pointer"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />

              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Узоры</h2>

              <div className="flex gap-5 flex-wrap">
                <button
                  onClick={() => setPattern('dots')}
                  className={`px-6 py-3 rounded-xl border text-lg transition ${
                    pattern === 'dots'
                      ? 'bg-pink-100 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Горошек
                </button>

                <button
                  onClick={() => setPattern('stripes')}
                  className={`px-6 py-3 rounded-xl border text-lg transition ${
                    pattern === 'stripes'
                      ? 'bg-pink-100 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Полосы
                </button>

                <button
                  onClick={() => setPattern('hearts')}
                  className={`px-6 py-3 rounded-xl border text-lg transition ${
                    pattern === 'hearts'
                      ? 'bg-pink-100 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Авторский
                </button>
                <button
                  onClick={() => setPattern('waves')}
                  className={`px-6 py-3 rounded-xl border text-lg transition ${
                    pattern === 'waves'
                      ? 'bg-pink-100 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Салют
                </button>
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
