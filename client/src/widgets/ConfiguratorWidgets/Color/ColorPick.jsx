export default function ColorPicker({ value, onChange }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Цвет</h2>

      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-10 cursor-pointer"
      />
    </div>
  );
}
