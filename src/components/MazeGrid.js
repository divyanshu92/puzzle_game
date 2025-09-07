import React, { memo } from 'react';

const MazeCell = memo(({ cell, isPlayer, isGoal, onClick }) => (
  <div
    className={`cell ${cell === 1 ? 'wall' : 'path'} ${isPlayer ? 'player' : ''} ${isGoal ? 'goal' : ''}`}
    onClick={onClick}
  />
));

const MazeGrid = memo(({ maze, player, goal, onCellClick, mazeSize }) => (
  <div className="maze mx-auto" style={{'--maze-size': mazeSize}}>
    {maze.map((row, y) =>
      row.map((cell, x) => (
        <MazeCell
          key={`${x}-${y}`}
          cell={cell}
          isPlayer={player.x === x && player.y === y}
          isGoal={goal.x === x && goal.y === y}
          onClick={() => onCellClick(x, y)}
        />
      ))
    )}
  </div>
));

export default MazeGrid;