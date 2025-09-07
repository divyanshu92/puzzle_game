# Maze Game

A high-performance, interactive maze game built with React featuring dynamic maze generation, pathfinding algorithms, and customizable dimensions.

## 🎮 Features

- **Dynamic Maze Generation**: Creates new random maze using recursive backtracking algorithm
- **Smart Pathfinding**: Click any reachable cell and watch the player navigate automatically using BFS
- **Keyboard Controls**: Use arrow keys for manual step-by-step movement
- **Customizable Dimensions**: Adjust maze size from 5x5 to 100x100 with real-time controls
- **Optimized Performance**: Memoized components and efficient rendering for smooth gameplay
- **Responsive Design**: Built with Bootstrap for mobile and desktop compatibility

## 🚀 Live Demo

[Play the game here](https://divyanshu92.github.io/puzzle_game)

## 📁 Project Structure

```
src/
├── components/
│   └── MazeGrid.js          # Optimized maze rendering with memoization
├── hooks/
│   └── useMaze.js           # Custom hook for maze state management
├── utils/
│   └── pathfinding.js       # BFS pathfinding algorithm
├── App.js                   # Main application component
├── App.css                  # Optimized styles for performance
└── index.js                 # React entry point
```

## 🛠️ Technical Implementation

### Core Components

- **MazeGrid**: Memoized component preventing unnecessary re-renders
- **MazeCell**: Individual cell component with click handling
- **useMaze Hook**: Manages maze generation and player state
- **Pathfinding Utility**: Breadth-First Search for optimal path calculation

### Performance Optimizations

- React.memo for component memoization
- Custom hooks for state separation
- Efficient maze generation algorithm
- Minimal CSS for faster rendering
- Optimized pathfinding with early termination

### Algorithms Used

- **Maze Generation**: Recursive Backtracking
- **Pathfinding**: Breadth-First Search (BFS)
- **Movement**: Real-time keyboard event handling

## 🎯 How to Play

1. **Manual Movement**: Use arrow keys (↑↓←→) to move the green player step by step
2. **Auto Navigation**: Click any white cell to automatically navigate there
3. **Win Condition**: Reach the golden goal cell to complete the maze
4. **New Maze**: Adjust size using slider/input and click Submit for new challenge
5. **Size Range**: Choose from 5x5 (easy) to 100x100 (extreme) difficulty

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
git clone https://github.com/divyanshu92/puzzle_game.git
cd puzzle_game
npm install
```

### Development
```bash
npm start
# Opens http://localhost:3000
```

### Production Build
```bash
npm run build
# Creates optimized build in /build folder
```

### Deploy to GitHub Pages
```bash
npm run deploy
# Automatically builds and deploys to gh-pages branch
```

## 🔧 Configuration

### Maze Size Limits
- **Minimum**: 5x5 (25 cells)
- **Maximum**: 100x100 (10,000 cells)
- **Default**: 60x60 (3,600 cells)

### Performance Settings
- **Pathfinding Speed**: 50ms per step (adjustable in App.js)
- **Cell Size**: 12px (responsive via CSS variables)
- **Memory Usage**: Optimized for large mazes up to 100x100

## 🎨 Customization

### Styling
Modify `src/App.css` to change:
- Cell colors and sizes
- Player and goal appearance
- Grid borders and spacing

### Game Logic
Adjust in respective files:
- **Maze generation**: `src/hooks/useMaze.js`
- **Pathfinding**: `src/utils/pathfinding.js`
- **Movement speed**: `src/App.js` (setTimeout value)

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for responsive design components
- GitHub Pages for free hosting