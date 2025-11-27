export default function Footer() {
  return (
    <footer className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center bg-white/80 backdrop-blur-md rounded-t-2xl">
        <div className="flex flex-col gap-1 text-sm text-gray-700">
          <span>📍 Россия, Москва, ул. Орджоникидзе, 11/10</span>
          <span>📧 support@sockslab.com</span>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          © {new Date().getFullYear()} SocksLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
