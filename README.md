# 🃏 Quiz Master Game – Monorepo

A full-stack project for an interactive **Flashcard Quiz Game**:  
Users can create their own flashcard decks, take quizzes, and track progress through a fun and engaging interface.

## 📦 Monorepo Structure

```
Quiz-Master/
│
├── frontend/         # React (or other) frontend app
│   └── ...           # Frontend source, components, assets, etc.
│
├── backend/          # Node.js/Express/MongoDB backend API
│   └── ...           # Backend source, models, controllers, etc.
│
├── README.md         # Project documentation (this file)
├── package.json      # For monorepo tools/scripts (optional)
└── ...
```

## ✨ Features

- **Create & manage flashcard decks**
- **Add quiz questions** with multiple choices (one correct answer, several wrong answers)
- **Take quizzes**:  
  - 10 questions per session, randomized order
  - Select one or more answers
  - Instant feedback and progress tracking
  - Detailed results at the end with score
- **Track your progress** over multiple sessions

---

## 🧭 User Flow

- The user can select to either play the quiz game or add new quiz cards.
- When adding quiz cards, users provide a question, one correct answer, and one or more wrong answers.
- Quiz cards are stored securely in the database.
- When playing a quiz:
  - 10 questions are presented in a random order.
  - Users select answers; correct answers earn points.
  - Progress is displayed throughout.
  - At the end, the user sees their score and can choose to play again.
---

## 🛠 Tech Stack

- **Frontend**: React (or other modern JS framework)
- **Backend**: Node.js 22, Express, MongoDB (Mongoose)
- **Testing**: Jest, React Testing Library, Supertest (as appropriate)
- **Dev Tools**: dotenv, nodemon, Postman

---

## 📚 API Overview

_Backend API lives at `/backend` — see [backend/README.md](./Flashcard-Backend/README.md) for full documentation._

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss changes.
---

> Built with ❤️ for learning and fun!
