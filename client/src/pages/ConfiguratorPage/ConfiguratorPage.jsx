import { useState, useRef } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';

import SockCanvas from '../../widgets/ConfiguratorWidgets/Sock';
import EmojiPicker from '../../widgets/ConfiguratorWidgets/Image/ImagePick';
import PatternPicker from '../../widgets/ConfiguratorWidgets/Pattern/PatternPick';
import ColorPicker from '../../widgets/ConfiguratorWidgets/Color/ColorPick';
import PatternColorPicker from '../../widgets/ConfiguratorWidgets/Pattern/PatternColorPick';

export default function ConfiguratorPage({ openCart }) {
  const [color, setColor] = useState('#ffffff');
  const [pattern, setPattern] = useState(null);
  const [patternColor, setPatternColor] = useState('#ffffff');
  const [emoji, setEmoji] = useState(null);

  const sockRef = useRef(null);

  // -------------------------------
  // ДОБАВИТЬ В КОРЗИНУ
  // -------------------------------
  async function handleAddToCart() {
    try {
      const preview = sockRef.current.getPNG();
      const { x: emojiX, y: emojiY } = sockRef.current.getEmojiCoords();

      const payload = {
        colorHex: color,
        patternName: pattern || '',
        patternColorHex: patternColor || '',
        emoji: emoji || '',
        emojiX,
        emojiY,
        preview,
        user_id: 1,
      };

      const response = await axiosInstance.post('/cart/add', payload);

      console.log('Добавлено:', response.data);
      alert('Добавлено в Корзину!');
      if (openCart) openCart(true);
    } catch (error) {
      console.error('Ошибка добавления:', error);
    }
  }

  // -------------------------------
  // ДОБАВИТЬ В ИЗБРАННОЕ
  // -------------------------------
  async function handleAddToFavorites() {
    try {
      const preview = sockRef.current.getPNG();
      const { x: emojiX, y: emojiY } = sockRef.current.getEmojiCoords();

      const payload = {
        colorHex: color,
        patternName: pattern || '',
        patternColorHex: patternColor || '',
        emoji: emoji || '',
        emojiX: Math.round(emojiX),
        emojiY: Math.round(emojiY),
        preview,
        user_id: 1,
      };

      const response = await axiosInstance.post('/favorites/', payload);

      console.log('Избранное добавлено:', response.data);
      alert('Добавлено в избранное!');
    } catch (error) {
      console.error('Ошибка избранного:', error);
      alert('Ошибка добавления в избранное');
    }
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="max-w-7xl w-full bg-white/50 p-10 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <EmojiPicker selected={emoji} onSelect={setEmoji} />

          <div className="flex flex-col items-center gap-6">
            <SockCanvas
              ref={sockRef}
              color={color}
              pattern={pattern}
              patternColor={patternColor}
              emoji={emoji}
            />

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                В корзину
              </button>

              <button
                onClick={handleAddToFavorites}
                className="px-6 py-3 rounded-full bg-purple-300 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                В избранное
              </button>
            </div>
          </div>

          <div className="bg-white/70 p-6 rounded-2xl shadow-md border">
            <ColorPicker value={color} onChange={setColor} />
            <PatternPicker value={pattern} onChange={setPattern} />
            <PatternColorPicker value={patternColor} onChange={setPatternColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
