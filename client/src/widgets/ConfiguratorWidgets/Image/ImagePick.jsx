export default function EmojiPicker({ selected, onSelect }) {
  const emojis = ["⭐", "🔥", "🌈", "❤️", "🎉"];

  return (
    <div className="bg-white/70 p-6 rounded-2xl border shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">Изображения</h2>

      <div className="flex flex-col gap-4">
        {emojis.map((e) => (
          <div
            key={e}
            onClick={() => onSelect(e)}
            className={`cursor-pointer text-4xl p-4 rounded-xl border transition ${
              selected === e
                ? "bg-pink-100 border-pink-400"
                : "bg-white border-gray-300"
            }`}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
