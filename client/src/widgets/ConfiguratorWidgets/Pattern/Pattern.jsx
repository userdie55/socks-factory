function dotsPattern(width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  const step = 35;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return c;
}

function stripesPattern(width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  const stripeWidth = 25;

  for (let x = 0; x < width; x += stripeWidth * 2) {
    ctx.fillRect(x, 0, stripeWidth, height);
  }

  return c;
}

export function generatePattern(name, width, height) {
  if (name === "dots") return dotsPattern(width, height);
  if (name === "stripes") return stripesPattern(width, height);
  return null;
}
