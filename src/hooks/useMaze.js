import { useState, useCallback, useMemo } from 'react';

export const useMaze = (mazeSize) => {
  const [maze, setMaze] = useState([]);
  const [player, setPlayer] = useState({ x: 1, y: 1 });

  const goal = useMemo(() => ({ x: mazeSize - 2, y: mazeSize - 2 }), [mazeSize]);

  const generateMaze = useCallback(() => {
    const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(1));
    
    const stack = [];
    const start = { x: 1, y: 1 };
    newMaze[start.y][start.x] = 0;
    stack.push(start);

    const directions = [{ x: 0, y: -2 }, { x: 2, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbors = directions
        .map(dir => ({ x: current.x + dir.x, y: current.y + dir.y }))
        .filter(pos => pos.x > 0 && pos.x < mazeSize - 1 && pos.y > 0 && pos.y < mazeSize - 1 && newMaze[pos.y][pos.x] === 1);

      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        newMaze[next.y][next.x] = 0;
        newMaze[current.y + (next.y - current.y) / 2][current.x + (next.x - current.x) / 2] = 0;
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    setMaze(newMaze);
    setPlayer({ x: 1, y: 1 });
  }, [mazeSize]);

  return { maze, player, setPlayer, goal, generateMaze };
};