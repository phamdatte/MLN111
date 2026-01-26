# 🏁 HÀNH TRÌNH TỚI ĐỘC LẬP – The Great Race

An educational board game about the August Revolution (Cách mạng Tháng Tám), built with React + Vite + Tailwind CSS.

## 🎮 Game Description

**HÀNH TRÌNH TỚI ĐỘC LẬP** is an interactive educational board game where 9 groups race from Pác Bó to Quảng trường Ba Đình, answering questions about Vietnam's August Revolution to advance.

### Features

- 🎲 **9 Player Groups** - Each with unique colors racing to independence
- 📚 **Quiz System** - 15 questions across 3 difficulty levels
- ⏱️ **30-Second Timer** - Answer quickly or lose your turn
- 🎁 **Special Cells** - Lucky cells (+1) and Obstacle cells (-1)
- 🏆 **Victory Screen** - Celebrate the winning group
- 🎨 **Revolutionary Theme** - Beautiful red-yellow-brown color scheme
- 📱 **Responsive Design** - Works on laptops and projectors

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎯 How to Play

1. **Start Game** - Click "Bắt Đầu" to begin
2. **Spin Turn** - Click "Quay Lượt" to randomly select a group
3. **Choose Difficulty**:
   - 🟢 **Dễ (Easy)** - +1 cell if correct
   - 🟡 **Trung bình (Medium)** - +2 cells if correct
   - 🔴 **Khó (Hard)** - +3 cells if correct
4. **Answer Question** - Type your answer within 30 seconds
5. **Special Cells**:
   - 🎁 **May mắn (Lucky)** - Bonus +1 cell
   - ⚠️ **Giặc cản (Obstacle)** - Penalty -1 cell
6. **Win** - First group to reach Quảng trường Ba Đình wins!

## 📁 Project Structure

```
src/
├── data/
│   └── questions.js          # Question bank (15 questions)
├── components/
│   ├── Board.jsx             # Game board with 25 cells
│   ├── Cell.jsx              # Individual cell component
│   ├── PlayerToken.jsx       # Player token (9 groups)
│   ├── QuestionModal.jsx     # Question display with timer
│   ├── Timer.jsx             # 30-second countdown timer
│   └── ControlPanel.jsx      # Game controls
├── pages/
│   └── Game.jsx              # Main game logic
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── index.css                 # Global styles + Tailwind
```

## 🎨 Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **JavaScript** - No TypeScript
- **gh-pages** - GitHub Pages deployment

## 📝 Customizing Questions

Edit `src/data/questions.js` to add your own questions:

```javascript
{
  id: 16,
  level: "easy",  // "easy" | "medium" | "hard"
  question: "Your question here?",
  answer: "Your answer"
}
```

## 🌐 Deploy to GitHub Pages

### Step 1: Update Repository Name

Edit `vite.config.js` and change the `base` path to match your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Change this!
})
```

### Step 2: Deploy

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **gh-pages** branch
4. Click **Save**

Your game will be available at: `https://yourusername.github.io/your-repo-name/`

## 🎓 Educational Content

This game covers key topics about Vietnam's August Revolution:

- Formation of Việt Minh (1941)
- Pác Bó Conference
- General Uprising (Tổng khởi nghĩa)
- Emperor Bảo Đại's abdication
- Declaration of Independence (September 2, 1945)
- Establishment of Democratic Republic of Vietnam

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to add more questions, improve the UI, or suggest new features!

---

**Made with ❤️ for learning Vietnamese history**
