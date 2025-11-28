export default function PatternColorPicker({ value, onChange }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Цвет узора
      </h2>

      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-10 cursor-pointer"
      />
    </div>
  );
}
