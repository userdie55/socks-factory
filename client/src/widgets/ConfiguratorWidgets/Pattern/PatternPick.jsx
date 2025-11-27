export default function PatternPicker({ value, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Узор</h2>

      <div className="flex gap-4">
        <button
          onClick={() => onChange("dots")}
          className={`px-4 py-2 rounded-xl border ${
            value === "dots"
              ? "bg-pink-100 border-pink-400"
              : "bg-white border-gray-300"
          }`}
        >
          Точки
        </button>

        <button
          onClick={() => onChange("stripes")}
          className={`px-4 py-2 rounded-xl border ${
            value === "stripes"
              ? "bg-pink-100 border-pink-400"
              : "bg-white border-gray-300"
          }`}
        >
          Полосы
        </button>
      </div>
    </div>
  );
}
