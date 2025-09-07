export const findPath = (maze, startX, startY, endX, endY, mazeSize) => {
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
};