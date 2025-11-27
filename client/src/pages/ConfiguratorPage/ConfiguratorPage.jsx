import { useState } from "react";
import SockCanvas from "../../widgets/ConfiguratorWidgets/Sock";
import EmojiPicker from "../../widgets/ConfiguratorWidgets/Image/ImagePick";
import PatternPicker from "../../widgets/ConfiguratorWidgets/Pattern/PatternPick";
import ColorPicker from "../../widgets/ConfiguratorWidgets/Color/ColorPick";

export default function ConfiguratorPage() {
  const [color, setColor] = useState("#ff7bcb");
  const [pattern, setPattern] = useState(null);
  const [emoji, setEmoji] = useState(null);

  return (
    <div className="min-h-screen pt-24 px-6 flex justify-center">
      <div className="max-w-7xl w-full bg-white/50 p-10 rounded-3xl">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — EMOJI PICKER */}
          <EmojiPicker selected={emoji} onSelect={setEmoji} />

          {/* CENTER — CANVAS + BUTTONS */}
          <div className="flex flex-col items-center justify-start gap-6">

            <SockCanvas color={color} pattern={pattern} emoji={emoji} />

            {/* BUTTONS */}
            <div className="flex gap-4 mt-2">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition">
                В корзину
              </button>

              <button className="px-6 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition">
                В избранное
              </button>
            </div>

          </div>

          {/* RIGHT — COLOR & PATTERN */}
          <div className="bg-white/70 p-6 rounded-2xl shadow-md border">
            <ColorPicker value={color} onChange={setColor} />
            <PatternPicker value={pattern} onChange={setPattern} />
          </div>

        </div>
      </div>
    </div>
  );
}