// widgets/ConfiguratorWidgets/Pattern/PatternPick.jsx

export default function PatternPicker({ value, onChange }) {
  const patterns = [
    { id: "dots", label: "Точки" },
    { id: "stripes", label: "Полосы" },
    { id: "hearts", label: "Сердечки" },
    { id: "grid", label: "Клетка" },
    { id: "waves", label: "Волны" },
    { id: "camo", label: "Камуфляж" },
    { id: "snow", label: "Снег" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Узоры</h2>

      <div className="flex flex-wrap gap-3">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`px-4 py-2 rounded-xl border transition ${
              value === p.id
                ? "bg-pink-100 border-pink-400"
                : "bg-white border-gray-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
