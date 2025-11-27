import { useState } from 'react';

export default function ConfiguratorPage() {
  const [color, setColor] = useState('#ff7bcb');
  const [pattern, setPattern] = useState(null);
  const [image, setImage] = useState(null);

  const SockSVG = ({ color }) => (
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
        M160 20
        v110
        c0 15 -10 25 -20 35
        l-40 35
        c-20 18 -55 10 -65 -15
        l-5 -15
        c-5 -15 5 -25 20 -35
        l35 -25
        v-90
        c0 -10 10 -20 25 -20
        h20
        c15 0 30 10 30 20
      "
        fill={color}
        stroke="#00000020"
        strokeWidth="2"
        style={{ transition: '0.3s' }}
      />
    </svg>
  );

  return (
    <div className="min-h-screen pt-24 px-6 flex justify-center">
      <div className="max-w-7xl w-full bg-white/50 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-xl">
        {/* GRID 3 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT — IMAGES */}
          <div className="bg-white/70 p-6 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Изображения</h2>

            <div className="flex flex-col gap-4">
              {['⭐', '🔥', '🌈'].map((item) => (
                <div
                  key={item}
                  onClick={() => setImage(item)}
                  className={`cursor-pointer text-4xl p-4 rounded-xl border transition ${
                    image === item
                      ? 'bg-pink-100 border-pink-400'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — SOCK PREVIEW */}
          <div className="flex flex-col items-center justify-start">
            {/* FIXED PREVIEW BLOCK */}
            <div className="relative flex flex-col items-center mb-8">
              <SockSVG color={color} />

              {/* CENTERED IMAGE */}
              {image && (
                <div
                  className="absolute text-4xl select-none pointer-events-none"
                  style={{
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {image}
                </div>
              )}

              {/* CENTERED DOTS */}
              {pattern === 'dots' && (
                <div
                  className="absolute text-4xl opacity-20 select-none pointer-events-none"
                  style={{
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  ⋯⋯⋯
                </div>
              )}

              {/* CENTERED STRIPES */}
              {pattern === 'stripes' && (
                <div
                  className="absolute text-4xl opacity-20 select-none pointer-events-none"
                  style={{
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  ≡≡≡
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-4">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition">
                В корзину
              </button>

              <button className="px-6 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition">
                В избранное
              </button>
            </div>
          </div>

          {/* RIGHT — COLORS & PATTERNS */}
          <div className="bg-white/70 p-6 rounded-2xl border border-gray-200 shadow-md">
            {/* COLORS */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Цвета</h2>
            <input
              type="color"
              className="w-16 h-10 mb-8 cursor-pointer"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            {/* PATTERNS */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Узоры</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setPattern('dots')}
                className={`px-4 py-2 rounded-xl border transition ${
                  pattern === 'dots'
                    ? 'bg-pink-100 border-pink-400'
                    : 'bg-white border-gray-300'
                }`}
              >
                Точки
              </button>

              <button
                onClick={() => setPattern('stripes')}
                className={`px-4 py-2 rounded-xl border transition ${
                  pattern === 'stripes'
                    ? 'bg-pink-100 border-pink-400'
                    : 'bg-white border-gray-300'
                }`}
              >
                Полосы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
