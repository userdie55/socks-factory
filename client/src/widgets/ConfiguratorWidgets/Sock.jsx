import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { applyColor } from "./Color/Color";
import { generatePattern } from "./Pattern/Pattern";
import { initEmojiDrag } from "./Image/ImageDrag";

// ---------- ВАЖНО ----------
// forwardRef ДОЛЖЕН быть ровно так!
const SockCanvas = forwardRef(function SockCanvas(
  { color, pattern, patternColor, emoji },
  ref
) {
  const canvasRef = useRef(null);
  const sockImgRef = useRef(null);

  // позиция emoji
  const emojiState = useRef({
    x: 200,
    y: 250,
    dragging: false,
  });

  // refs для стабильных значений
  const emojiRef = useRef(null);
  const patternRef = useRef(null);
  const patternColorRef = useRef(null);
  const colorRef = useRef(null);

  const needsRedraw = useRef(false);

  function requestDraw() {
    if (!needsRedraw.current) {
      needsRedraw.current = true;
      requestAnimationFrame(draw);
    }
  }

  // ---------- Методы для родителя ----------
  useImperativeHandle(ref, () => ({
    getPNG() {
      return canvasRef.current.toDataURL("image/png");
    },
    getEmojiCoords() {
      return {
        x: emojiState.current.x,
        y: emojiState.current.y,
      };
    },
  }));

  // ---------- Загрузка PNG носка ----------
  useEffect(() => {
    const img = new Image();
    img.src = "/sock.png";
    img.onload = () => {
      sockImgRef.current = img;
      requestDraw();
    };
  }, []);

  // ---------- Обновление состояния ----------
  useEffect(() => {
    emojiRef.current = emoji;
    requestDraw();
  }, [emoji]);

  useEffect(() => {
    patternRef.current = pattern;
    patternColorRef.current = patternColor;
    requestDraw();
  }, [pattern, patternColor]);

  useEffect(() => {
    colorRef.current = color;
    requestDraw();
  }, [color]);

  // ---------- Функция отрисовки ----------
  function draw() {
    needsRedraw.current = false;

    const canvas = canvasRef.current;
    if (!canvas || !sockImgRef.current) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

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

    // Получаем пиксели носка
    let imgData = ctx.getImageData(0, 0, W, H);

    // === цвет ===
    if (colorRef.current) {
      applyColor(imgData, colorRef.current);
    }

    // === узор ===
    if (patternRef.current) {
      const pCanvas = generatePattern(
        patternRef.current,
        W,
        H,
        patternColorRef.current
      );

      const pData = pCanvas
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

    // === emoji ===
    if (emojiRef.current) {
      ctx.font = "64px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        emojiRef.current,
        emojiState.current.x,
        emojiState.current.y
      );
    }
  }

  // ---------- drag emoji ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    const cleanup = initEmojiDrag(canvas, emojiState, requestDraw);
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
