import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] pt-20 px-6">
      <div className="mx-auto max-w-4xl w-full bg-white/70 backdrop-blur-lg 
        border border-gray-200 rounded-2xl p-16 shadow-xl">
        
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Создай свои необычные носки вместе с нами
        </h2>

        <div className="flex justify-center">
          <Link
            to="/configurator"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
            text-white font-semibold shadow-md transition transform hover:scale-105 hover:shadow-xl 
            hover:shadow-pink-400/40"
          >
            Перейти в конфигуратор
          </Link>
        </div>

      </div>
    </div>
  );
}
