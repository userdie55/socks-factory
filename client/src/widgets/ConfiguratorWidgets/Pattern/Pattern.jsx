// widgets/ConfiguratorWidgets/Pattern/Pattern.js

// === UTILS ===
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// === DOTS ===
function dotsPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  const step = 35;
  ctx.fillStyle = hexToRgba(color, 0.4);

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return c;
}

// === STRIPES ===
function stripesPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.fillStyle = hexToRgba(color, 0.25);
  const stripeWidth = 25;

  for (let x = 0; x < width; x += stripeWidth * 2) {
    ctx.fillRect(x, 0, stripeWidth, height);
  }

  return c;
}

// === HEARTS ❤️ ===
function heartsPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.font = "28px serif";
  ctx.fillStyle = hexToRgba(color, 0.35);

  const step = 50;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      ctx.fillText("❤️", x, y);
    }
  }

  return c;
}

// === GRID ===
function gridPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.strokeStyle = hexToRgba(color, 0.25);
  ctx.lineWidth = 2;

  const step = 40;

  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  return c;
}

// === WAVES 🌊 ===
function wavesPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.strokeStyle = hexToRgba(color, 0.3);
  ctx.lineWidth = 4;

  const amplitude = 10;
  const step = 40;

  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const dy = Math.sin(x / 20) * amplitude;
      ctx.lineTo(x, y + dy);
    }
    ctx.stroke();
  }

  return c;
}

// === CAMO ===
function camoPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  const colors = [
    hexToRgba(color, 0.25),
    hexToRgba(color, 0.15),
    hexToRgba(color, 0.30),
  ];

  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

    const x = Math.random() * width;
    const y = Math.random() * height;
    const w = 40 + Math.random() * 60;
    const h = 20 + Math.random() * 40;

    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  return c;
}

// === SNOW ❄️ ===
function snowPattern(width, height, color) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.font = "20px serif";
  ctx.fillStyle = hexToRgba(color, 0.4);

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillText("❄️", x, y);
  }

  return c;
}

// === MAIN SWITCH ===
export function generatePattern(name, width, height, color) {
  switch (name) {
    case "dots": return dotsPattern(width, height, color);
    case "stripes": return stripesPattern(width, height, color);
    case "hearts": return heartsPattern(width, height, color);
    case "grid": return gridPattern(width, height, color);
    case "waves": return wavesPattern(width, height, color);
    case "camo": return camoPattern(width, height, color);
    case "snow": return snowPattern(width, height, color);
    default: return null;
  }
}
