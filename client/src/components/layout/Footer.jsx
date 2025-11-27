export default function Footer() {
  return (
    <footer className="mt-20">
      <div
        className="
          mx-auto max-w-7xl px-6 py-8
          text-center
          bg-white/80
          backdrop-blur-lg
          rounded-t-2xl
          shadow-[0_-10px_30px_rgba(0,0,0,0.1)]
          border-t border-white/40
        "
      >
        

        <div className="flex flex-col gap-1 text-s text-gray-700">
          <span>📍 Россия, Москва, ул. Орджоникидзе, 11/10</span>
          <span>📧 support@sockslab.com</span>
        </div>

        <p className="text-s text-gray-600 mt-4">
          © {new Date().getFullYear()} SocksLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
