"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const COLS = 17;
const ROWS = 15;
const CELL = 18;

type Vec = { x: number; y: number };
type Segment = { x: number; y: number; prevX: number; prevY: number };

const DIRS: Record<string, Vec> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

export default function SnakeGame() {
  const { theme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);

  const blink = useRef({ isBlinking: false, timer: 0 });
  const tongue = useRef({ state: "in" as "in" | "out", timer: 0, phase: 0 });

  const snake = useRef<Segment[]>([
    { x: 8, y: 7, prevX: 8, prevY: 7 },
    { x: 7, y: 7, prevX: 7, prevY: 7 },
  ]);
  const dir = useRef<Vec>({ x: 1, y: 0 });
  const food = useRef<Vec>({ x: 12, y: 7 });
  const stopped = useRef(true);

  // -- Input Buffering --
  const moveQueue = useRef<Vec[]>([]);

  // -- Time Steps --
  const accumulator = useRef(0);
  const stepTime = 120; // 120ms per tick

  const touchStart = useRef<Vec | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  };

  function placeFood() {
    while (true) {
      const p = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
      if (!snake.current.some((s) => s.x === p.x && s.y === p.y)) {
        food.current = p;
        return;
      }
    }
  }

  function resetGame() {
    snake.current = [
      { x: 8, y: 7, prevX: 8, prevY: 7 },
      { x: 7, y: 7, prevX: 7, prevY: 7 },
    ];
    dir.current = { x: 1, y: 0 };
    moveQueue.current = [];
    accumulator.current = 0;
    placeFood();
    stopped.current = true;
    tongue.current = { state: "in", timer: 0, phase: 0 };
  }

  function update() {
    if (moveQueue.current.length > 0) {
      const next = moveQueue.current.shift()!;
      if (next.x !== -dir.current.x || next.y !== -dir.current.y) {
        dir.current = next;
      }
    }

    const d = dir.current;
    const head = snake.current[0];
    const newHeadX = head.x + d.x;
    const newHeadY = head.y + d.y;

    // Collision
    if (
      newHeadX < 0 ||
      newHeadX >= COLS ||
      newHeadY < 0 ||
      newHeadY >= ROWS ||
      snake.current.some((s) => s.x === newHeadX && s.y === newHeadY)
    ) {
      resetGame();
      return;
    }

    const isEating = newHeadX === food.current.x && newHeadY === food.current.y;

    // 1. Snapshot previous positions
    for (let i = 0; i < snake.current.length; i++) {
      snake.current[i].prevX = snake.current[i].x;
      snake.current[i].prevY = snake.current[i].y;
    }

    // 2. Growth
    if (isEating) {
      const tail = snake.current[snake.current.length - 1];
      snake.current.push({ ...tail });
      placeFood();
    }

    // 3. Move Body (Caterpillar)
    for (let i = snake.current.length - 1; i > 0; i--) {
      snake.current[i].x = snake.current[i - 1].x;
      snake.current[i].y = snake.current[i - 1].y;
    }

    // 4. Move Head
    snake.current[0].x = newHeadX;
    snake.current[0].y = newHeadY;
  }

  function draw(ctx: CanvasRenderingContext2D, alpha: number) {
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);

    // -- Background --
    ctx.fillStyle = themeRef.current === "dark" ? "#222" : "#CCC";
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if ((x + y) % 2 === 0) ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }

    // -- Food --
    const fx = food.current.x * CELL + CELL / 2;
    const fy = food.current.y * CELL + CELL / 2;
    ctx.fillStyle = "#00a63e";
    ctx.fillRect(fx - 1, fy - CELL / 2, 2, CELL / 3);
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(fx, fy + 1, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();

    // -- Snake Body --
    if (snake.current.length > 0) {
      // 1. Calculate raw interpolated points
      const rawPoints = snake.current.map((s) => ({
        x: lerp(s.prevX, s.x, alpha) * CELL + CELL / 2,
        y: lerp(s.prevY, s.y, alpha) * CELL + CELL / 2,
      }));

      // 2. Filter out points that are too close (overlapping segments)
      // This prevents the "jitter" when a segment catches up to its neighbor.
      const points: { x: number; y: number }[] = [];
      if (rawPoints.length > 0) points.push(rawPoints[0]);

      for (let i = 1; i < rawPoints.length; i++) {
        const last = points[points.length - 1];
        const curr = rawPoints[i];
        const dist = Math.hypot(curr.x - last.x, curr.y - last.y);
        // Only add point if it's far enough from the last one (> 1 pixel)
        if (dist > 1) {
          points.push(curr);
        }
      }

      ctx.save();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = CELL - 2;
      ctx.strokeStyle = "#22c55e";
      ctx.beginPath();

      if (points.length >= 2) {
        ctx.moveTo(points[0].x, points[0].y);
        // Use arcTo for perfect rounded corners instead of quadratic curves
        // We stop at the last point, as arcTo needs a "next" point to guide the corner
        for (let i = 1; i < points.length - 1; i++) {
          const pCurrent = points[i];
          const pNext = points[i + 1];
          // arcTo(controlX, controlY, destX, destY, radius)
          // The radius 8 looks good for 18px cells
          ctx.arcTo(pCurrent.x, pCurrent.y, pNext.x, pNext.y, 8);
        }
        // Connect to the actual tail tip
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      }
      ctx.stroke();
      ctx.restore();

      // Draw Head Circle to cover the start of the line
      const headX = rawPoints[0].x;
      const headY = rawPoints[0].y;

      ctx.fillStyle = "#4ade80";
      ctx.beginPath();
      ctx.arc(headX, headY, (CELL - 2) / 2, 0, Math.PI * 2);
      ctx.fill();

      // -- Tongue --
      const dx = dir.current.x;
      const dy = dir.current.y;

      if (!stopped.current) {
        if (tongue.current.state === "in") {
          if (Math.random() < 0.005) {
            tongue.current.state = "out";
            tongue.current.timer = 45;
            tongue.current.phase = 0;
          }
        } else {
          tongue.current.timer--;
          tongue.current.phase += 0.5;
          if (tongue.current.timer <= 0) tongue.current.state = "in";
        }
      }

      if (tongue.current.state === "out") {
        const tongueLen = 12;
        const tX = headX + dx * (CELL / 2);
        const tY = headY + dy * (CELL / 2);
        const jiggle = Math.sin(tongue.current.phase) * 2;
        const jx = -dy * jiggle;
        const jy = dx * jiggle;

        ctx.strokeStyle = "#f87171";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tX, tY);
        const tipX = tX + dx * tongueLen + jx;
        const tipY = tY + dy * tongueLen + jy;
        ctx.lineTo(tipX, tipY);
        // Fork
        const forkSz = 3;
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(
          tipX + dx * forkSz - dy * forkSz,
          tipY + dy * forkSz + dx * forkSz,
        );
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(
          tipX + dx * forkSz + dy * forkSz,
          tipY + dy * forkSz - dx * forkSz,
        );
        ctx.stroke();
      }

      // -- Eyes --
      if (!stopped.current) {
        blink.current.timer--;
        if (blink.current.timer <= 0) {
          blink.current.isBlinking = !blink.current.isBlinking;
          blink.current.timer = blink.current.isBlinking
            ? 25
            : Math.random() * 300 + 150;
        }
      }

      if (!blink.current.isBlinking) {
        ctx.fillStyle = "white";
        const eyeOffset = 4;
        const eyeSize = 2.5;
        const eye1 = {
          x: headX + dx * 5 + dy * eyeOffset,
          y: headY + dy * 5 - dx * eyeOffset,
        };
        const eye2 = {
          x: headX + dx * 5 - dy * eyeOffset,
          y: headY + dy * 5 + dx * eyeOffset,
        };

        [eye1, eye2].forEach((e) => {
          ctx.beginPath();
          ctx.arc(e.x, e.y, eyeSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.arc(e.x + dx * 0.5, e.y + dy * 0.5, eyeSize / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "white";
        });
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let lastTime = performance.now();

    function loop(now: number) {
      const delta = now - lastTime;
      lastTime = now;

      if (!stopped.current) {
        accumulator.current += delta;
        while (accumulator.current > stepTime) {
          update();
          accumulator.current -= stepTime;
        }
      }

      const alpha = stopped.current ? 0 : accumulator.current / stepTime;
      draw(ctx, alpha);
      requestAnimationFrame(loop);
    }
    const frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const d = DIRS[e.key];
      if (!d) return;

      if (stopped.current) {
        if (d.x === -1 && d.y === 0) dir.current = { x: 1, y: 0 };
        else dir.current = d;
        stopped.current = false;
        return;
      }

      const lastPlannedMove =
        moveQueue.current.length > 0
          ? moveQueue.current[moveQueue.current.length - 1]
          : dir.current;

      if (d.x === -lastPlannedMove.x && d.y === -lastPlannedMove.y) return;
      if (moveQueue.current.length < 3) moveQueue.current.push(d);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

    const d =
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? DIRS.ArrowRight
          : DIRS.ArrowLeft
        : dy > 0
          ? DIRS.ArrowDown
          : DIRS.ArrowUp;

    if (stopped.current) {
      if (d.x === -1 && d.y === 0) dir.current = { x: 1, y: 0 };
      else dir.current = d;
      stopped.current = false;
      return;
    }
    const lastPlannedMove =
      moveQueue.current.length > 0
        ? moveQueue.current[moveQueue.current.length - 1]
        : dir.current;

    if (d.x === -lastPlannedMove.x && d.y === -lastPlannedMove.y) return;
    moveQueue.current.push(d);
  }

  return (
    <canvas
      ref={canvasRef}
      width={COLS * CELL}
      height={ROWS * CELL}
      className="border shadow-2xl touch-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />
  );
}
