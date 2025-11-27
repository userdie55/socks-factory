// widgets/SockCanvas.jsx
import { useEffect, useRef } from "react";
import { applyColor } from "./Color/Color";
import { generatePattern } from "./Pattern/Pattern";
import { initEmojiDrag } from "./Image/ImageDrag";

export default function SockCanvas({ color, pattern, emoji }) {
  const canvasRef = useRef(null);
  const sockImgRef = useRef(null);

  // Теперь emoji хранится ТУТ, стабильно
  const emojiState = useRef({
    x: 200,
    y: 250,
    dragging: false,
    emoji: null, // <-- тут лежит текущий смайл
  });

  // Загружаем картинку носка
  useEffect(() => {
    const sockImg = new Image();
    sockImg.src = "/sock.png";
    sockImg.onload = () => {
      sockImgRef.current = sockImg;
      draw();
    };
  }, []);

  // Когда ИЗМЕНИЛИ emoji в UI → обновляем emojiState
  useEffect(() => {
    emojiState.current.emoji = emoji;
    draw();
  }, [emoji]);

  // Цвет или паттерн → тоже перерисовать
  useEffect(() => {
    draw();
  }, [color, pattern]);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas || !sockImgRef.current) return;

    const ctx = canvas.getContext("2d");
    const sockImg = sockImgRef.current;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Масштаб носка
    const scale = 1.15;
    const drawW = W * scale;
    const drawH = H * scale;
    const offsetX = (W - drawW) / 2;
    const offsetY = (H - drawH) / 2;

    ctx.drawImage(sockImg, offsetX, offsetY, drawW, drawH);

    // Получаем пиксели
    const imgData = ctx.getImageData(0, 0, W, H);

    // Окраска пикселей носка
    applyColor(imgData, color);

    // Паттерн
    if (pattern) {
      const patternCanvas = generatePattern(pattern, W, H);
      const pData = patternCanvas
        .getContext("2d")
        .getImageData(0, 0, W, H).data;

      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] > 0) {
          d[i] = d[i] * 0.7 + pData[i] * 0.3;
          d[i + 1] = d[i + 1] * 0.7 + pData[i + 1] * 0.3;
          d[i + 2] = d[i + 2] * 0.7 + pData[i + 2] * 0.3;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // === ЭМОДЗИ НА ВЕРХУ ===
    const currentEmoji = emojiState.current.emoji;

    if (currentEmoji) {
      ctx.font = "64px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        currentEmoji,
        emojiState.current.x,
        emojiState.current.y
      );
    }
  }

  // Подключаем drag
  useEffect(() => {
    const canvas = canvasRef.current;
    const cleanup = initEmojiDrag(canvas, emojiState, draw);
    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={500}
      className="rounded-xl border border-gray-200 shadow-md bg-transparent"
    />
  );
}
