import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [mazeSize, setMazeSize] = useState(60);
  const [tempSize, setTempSize] = useState(60);
  const [maze, setMaze] = useState([]);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [goal, setGoal] = useState({ x: mazeSize - 2, y: mazeSize - 2 });

  const generateMaze = useCallback(() => {
    const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(1));
    
    const stack = [];
    const start = { x: 1, y: 1 };
    newMaze[start.y][start.x] = 0;
    stack.push(start);

    const directions = [
      { x: 0, y: -2 }, { x: 2, y: 0 }, { x: 0, y: 2 }, { x: -2, y: 0 }
    ];

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
    setGoal({ x: mazeSize - 2, y: mazeSize - 2 });
  }, [mazeSize]);

  const handleSizeChange = (newSize) => {
    setTempSize(newSize);
  };

  const submitSize = () => {
    setMazeSize(tempSize);
  };

  const movePlayer = useCallback((dx, dy) => {
    setPlayer(prev => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;
      if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze[newY][newX] === 0) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [maze]);

  const findPath = useCallback((startX, startY, endX, endY) => {
    const queue = [{ x: startX, y: startY, path: [] }];
    const visited = new Set();
    
    while (queue.length > 0) {
      const { x, y, path } = queue.shift();
      const key = `${x},${y}`;
      
      if (visited.has(key)) continue;
      visited.add(key);
      
      if (x === endX && y === endY) return path;
      
      const directions = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }];
      for (const dir of directions) {
        const newX = x + dir.x;
        const newY = y + dir.y;
        if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && 
            maze[newY][newX] === 0 && !visited.has(`${newX},${newY}`)) {
          queue.push({ x: newX, y: newY, path: [...path, { x: newX, y: newY }] });
        }
      }
    }
    return null;
  }, [maze]);

  const handleCellClick = useCallback((x, y) => {
    if (maze[y] && maze[y][x] === 0) {
      const path = findPath(player.x, player.y, x, y);
      if (path) {
        let step = 0;
        const moveAlongPath = () => {
          if (step < path.length) {
            setPlayer(path[step]);
            step++;
            setTimeout(moveAlongPath, 100);
          }
        };
        moveAlongPath();
      }
    }
  }, [maze, player, findPath]);

  useEffect(() => {
    generateMaze();
  }, [generateMaze]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer]);

  const isWin = player.x === goal.x && player.y === goal.y;

  return (
    <div className="container-fluid text-center py-4">
      <h1 className="display-4 text-primary mb-4">Maze Game</h1>
      <div className="mb-3">
        <label className="form-label">Maze Size: {mazeSize} x {mazeSize}</label>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <input 
            type="range" 
            className="form-range" 
            min="5" 
            max="100" 
            value={tempSize} 
            onChange={(e) => handleSizeChange(parseInt(e.target.value))}
            style={{width: '200px'}}
          />
          <input 
            type="number" 
            className="form-control" 
            min="5" 
            max="100" 
            value={tempSize} 
            onChange={(e) => handleSizeChange(parseInt(e.target.value))}
            style={{width: '80px'}}
          />
          <button className="btn btn-primary" onClick={submitSize}>Submit</button>
        </div>
      </div>
      
      {isWin && <div className="alert alert-success">You Win! Refresh for new maze.</div>}

      <div className="maze mx-auto" style={{'--maze-size': mazeSize}}>
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`cell ${cell === 1 ? 'wall' : 'path'} ${
                player.x === x && player.y === y ? 'player' : ''
              } ${goal.x === x && goal.y === y ? 'goal' : ''}`}
              onClick={() => handleCellClick(x, y)}
              style={{ cursor: 'pointer' }}
            />
          ))
        )}
      </div>
      
      <p className="text-muted mt-3">Use arrow keys or click any reachable cell to move</p>
    </div>
  );
}

export default App;