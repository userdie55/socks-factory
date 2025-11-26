export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-16 shadow-xl">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Создай свои необычные носки вместе с нами
          </h2>

          <div className="flex justify-center">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:shadow-lg transition">
              Перейти в конфигуратор
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
