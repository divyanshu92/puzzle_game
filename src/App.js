import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MazeGrid from './components/MazeGrid';
import { useMaze } from './hooks/useMaze';
import { findPath } from './utils/pathfinding';

function App() {
  const [mazeSize, setMazeSize] = useState(60);
  const [tempSize, setTempSize] = useState(60);
  const { maze, player, setPlayer, goal, generateMaze } = useMaze(mazeSize);

  const movePlayer = useCallback((dx, dy) => {
    setPlayer(prev => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;
      if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze[newY][newX] === 0) {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [maze, mazeSize]);

  const handleCellClick = useCallback((x, y) => {
    if (maze[y] && maze[y][x] === 0) {
      const path = findPath(maze, player.x, player.y, x, y, mazeSize);
      if (path) {
        let step = 0;
        const moveAlongPath = () => {
          if (step < path.length) {
            setPlayer(path[step]);
            step++;
            setTimeout(moveAlongPath, 50);
          }
        };
        moveAlongPath();
      }
    }
  }, [maze, player, mazeSize]);

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

  const handleSizeChange = (newSize) => {
    setTempSize(newSize);
  };

  const submitSize = () => {
    setMazeSize(tempSize);
  };

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

      <MazeGrid 
        maze={maze}
        player={player}
        goal={goal}
        onCellClick={handleCellClick}
        mazeSize={mazeSize}
      />
      
      <p className="text-muted mt-3">Use arrow keys or click any reachable cell to move</p>
    </div>
  );
}

export default App;