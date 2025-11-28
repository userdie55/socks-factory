import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { applyColor } from "./Color/Color";
import { generatePattern } from "./Pattern/Pattern";
import { initEmojiDrag } from "./Image/ImageDrag";

const SockCanvas = forwardRef(function SockCanvas(
  { color, pattern, patternColor, emoji },
  ref
) {
  const canvasRef = useRef(null);
  const sockImgRef = useRef(null);

  const emojiState = useRef({
    x: 200,
    y: 250,
    dragging: false,
  });

  // ---------- Экспорт PNG наружу ----------
  useImperativeHandle(ref, () => ({
    getPNG() {
      return canvasRef.current.toDataURL("image/png");
    },
    getEmojiCoords() {
      return { x: emojiState.current.x, y: emojiState.current.y };
    },
  }));

  // ---------- Загрузка изображения носка ----------
  useEffect(() => {
    const img = new Image();
    img.src = "/sock.png";

    img.onload = () => {
      sockImgRef.current = img;
      draw();
    };
  }, []);

  // ---------- Перерисовка при смене опций ----------
  useEffect(() => {
    draw();
  }, [color, pattern, patternColor, emoji]);

  // ---------- Главная функция отрисовки ----------
  function draw() {
    const canvas = canvasRef.current;
    if (!canvas || !sockImgRef.current) return;

    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Масштабирование носка
    const scale = 1.15;
    const drawW = W * scale;
    const drawH = H * scale;
    const offsetX = (W - drawW) / 2;
    const offsetY = (H - drawH) / 2;

    ctx.drawImage(sockImgRef.current, offsetX, offsetY, drawW, drawH);

    // Получаем пиксели
    const imgData = ctx.getImageData(0, 0, W, H);
    applyColor(imgData, color);
    ctx.putImageData(imgData, 0, 0);

    // Генерация паттерна
    if (pattern) {
      const patternCanvas = generatePattern(pattern, W, H, patternColor);
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

      ctx.putImageData(imgData, 0, 0);
    }

    // Эмоджи
    if (emoji) {
      ctx.font = "64px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(emoji, emojiState.current.x, emojiState.current.y);
    }
  }

  // ---------- Drag & Drop для эмоджи ----------
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

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
});

export default SockCanvas;
