// widgets/emojiDrag.js

export function initEmojiDrag(canvas, emojiState, redraw) {
  function onMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = Math.hypot(x - emojiState.current.x, y - emojiState.current.y);

    if (dist < 40) {
      emojiState.current.dragging = true;
    }
  }

  function onMouseMove(e) {
    if (!emojiState.current.dragging) return;

    const rect = canvas.getBoundingClientRect();
    emojiState.current.x = e.clientX - rect.left;
    emojiState.current.y = e.clientY - rect.top;

    // ВАЖНО: перерисовываем в следующем кадре
    requestAnimationFrame(redraw);
  }

  function onMouseUp() {
    emojiState.current.dragging = false;
  }

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);

  return () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
  };
}
