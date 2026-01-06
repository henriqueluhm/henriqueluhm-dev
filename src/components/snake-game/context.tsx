"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GAME_CONFIG } from "./constants";
import type { Direction, Position, SnakeGameContextValue } from "./types";

interface ExtendedSnakeGameContextValue extends SnakeGameContextValue {
  snake: Position[];
  direction: Direction;
  apple: Position | null;
  score: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  startGame: () => void;
  resetGame: () => void;
  changeDirection: (newDirection: Direction) => void;
}

const SnakeGameContext = createContext<ExtendedSnakeGameContextValue>({
  isBoardActive: false,
  openBoard: () => {},
  closeBoard: () => {},
  snake: [],
  direction: "RIGHT",
  apple: null,
  score: 0,
  isGameOver: false,
  isGameStarted: false,
  startGame: () => {},
  resetGame: () => {},
  changeDirection: () => {},
});

function getInitialSnake(): Position[] {
  return [
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ];
}

function getRandomApplePosition(snake: Position[]): Position {
  let newApple: Position;
  do {
    newApple = {
      x: Math.floor(Math.random() * GAME_CONFIG.COLS),
      y: Math.floor(Math.random() * GAME_CONFIG.ROWS),
    };
  } while (
    snake.some(
      (segment) => segment.x === newApple.x && segment.y === newApple.y,
    )
  );
  return newApple;
}

function getNextPosition(head: Position, direction: Direction): Position {
  const next = { ...head };

  switch (direction) {
    case "UP":
      next.y -= 1;
      break;
    case "DOWN":
      next.y += 1;
      break;
    case "LEFT":
      next.x -= 1;
      break;
    case "RIGHT":
      next.x += 1;
      break;
  }

  return next;
}

function checkCollision(head: Position, snake: Position[]): boolean {
  if (
    head.x < 0 ||
    head.x >= GAME_CONFIG.COLS ||
    head.y < 0 ||
    head.y >= GAME_CONFIG.ROWS
  ) {
    return true;
  }

  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

export function SnakeGameProvider({ children }: { children: ReactNode }) {
  const initialSnake = getInitialSnake();

  const [isBoardActive, setIsBoardActive] = useState(false);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [apple, setApple] = useState<Position | null>(
    getRandomApplePosition(initialSnake),
  );
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const directionRef = useRef(direction);
  const nextDirectionRef = useRef<Direction | null>(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (isGameStarted && !apple) {
      setApple(getRandomApplePosition(snake));
    }
  }, [isGameStarted, apple, snake]);

  useEffect(() => {
    if (!isGameStarted || isGameOver || !isBoardActive) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const currentDirection =
          nextDirectionRef.current || directionRef.current;
        if (nextDirectionRef.current) {
          setDirection(nextDirectionRef.current);
          nextDirectionRef.current = null;
        }

        const head = prevSnake[0];
        const newHead = getNextPosition(head, currentDirection);

        if (checkCollision(newHead, prevSnake)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const ateApple =
          apple && newHead.x === apple.x && newHead.y === apple.y;

        let newSnake: Position[];
        if (ateApple) {
          newSnake = [newHead, ...prevSnake];
          setScore((s) => s + 10);
          setApple(getRandomApplePosition([newHead, ...prevSnake]));
        } else {
          newSnake = [newHead, ...prevSnake.slice(0, -1)];
        }

        return newSnake;
      });
    }, GAME_CONFIG.GAME_SPEED_MS);

    return () => clearInterval(gameLoop);
  }, [isGameStarted, isGameOver, isBoardActive, apple]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const resetGame = () => {
    setSnake(getInitialSnake());
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    nextDirectionRef.current = null;
    setApple(null);
    setScore(0);
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  const changeDirection = (newDirection: Direction) => {
    const currentDirection = directionRef.current;

    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (opposites[currentDirection] === newDirection) {
      return;
    }

    nextDirectionRef.current = newDirection;
  };

  const value: ExtendedSnakeGameContextValue = {
    isBoardActive,
    openBoard: () => setIsBoardActive(true),
    closeBoard: () => {
      setIsBoardActive(false);
      resetGame();
    },
    snake,
    direction,
    apple,
    score,
    isGameOver,
    isGameStarted,
    startGame,
    resetGame,
    changeDirection,
  };

  return (
    <SnakeGameContext.Provider value={value}>
      {children}
    </SnakeGameContext.Provider>
  );
}

export const useSnakeGame = () => useContext(SnakeGameContext);
