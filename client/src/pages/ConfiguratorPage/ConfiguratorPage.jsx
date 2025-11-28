import { useState } from "react";
import SockCanvas from "../../widgets/ConfiguratorWidgets/Sock";
import EmojiPicker from "../../widgets/ConfiguratorWidgets/Image/ImagePick";
import PatternPicker from "../../widgets/ConfiguratorWidgets/Pattern/PatternPick";
import ColorPicker from "../../widgets/ConfiguratorWidgets/Color/ColorPick";
import PatternColorPicker from "../../widgets/ConfiguratorWidgets/Pattern/PatternColorPick";

export default function ConfiguratorPage() {
  const [color, setColor] = useState("#ff7bcb");        // цвет носка
  const [pattern, setPattern] = useState(null);         // тип узора
  const [patternColor, setPatternColor] = useState("#ffffff"); // <-- НОВОЕ
  const [emoji, setEmoji] = useState(null);

  return (
    <div className="pt-24 px-6 flex justify-center">
      <div className="max-w-7xl w-full bg-white/50 p-10 rounded-3xl">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <EmojiPicker selected={emoji} onSelect={setEmoji} />

          <div className="flex flex-col items-center gap-6">
            <SockCanvas 
              color={color}
              pattern={pattern}
              patternColor={patternColor}   // <-- НОВОЕ
              emoji={emoji}
            />

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition">
                В корзину
              </button>

              <button className="px-6 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition">
                В избранное
              </button>
            </div>
          </div>

          <div className="bg-white/70 p-6 rounded-2xl shadow-md border">
            <ColorPicker value={color} onChange={setColor} />
            <PatternPicker value={pattern} onChange={setPattern} />

            {/* НОВАЯ СЕКЦИЯ */}
            <PatternColorPicker 
              value={patternColor} 
              onChange={setPatternColor} 
            />
          </div>

        </div>
      </div>
    </div>
  );
}
