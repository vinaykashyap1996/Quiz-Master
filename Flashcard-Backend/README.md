# 🎲 Quiz Master Backend API

A RESTful backend API for **Quiz Master**, built with **Node.js 22**, **Express**, and **MongoDB**. It manages categories and questions for quizzes, supporting creation, retrieval, updating, and deletion. Designed for easy integration and rapid development.

---

## 🚀 Tech Stack

- **Node.js** (v22)
- **Express.js**
- **MongoDB** & **Mongoose**
- **dotenv** (environment variables)
- **Nodemon** (development)
- **Postman** (optional, for API testing)

---

## 📁 Project Structure

```text
Flashcard-backend/
├── controllers/       # Route handlers (business logic)
├── models/            # Mongoose schemas
├── data/              # Database connection
├── routes/            # API endpoints
├── config/            # Configuration 
├── middleware/        # Error handling, logging, etc.
├── .env               # Environment variables
├── app.ts             # App entry point
├── package.json
```

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:vinaykashyap1996/Quiz-Master.git
cd Flashcard-Backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Flashcards-app
```

---

### 4️⃣ Start the Server

```bash
npm run dev   # Runs with nodemon (hot reload)
npm start     # Runs in production mode
yarn dev      # If using yarn
```

---

## 📚 API Reference

Base URL: `/api/`

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/categories`             | Get all categories              |
| POST   | `/add-category`           | Create a new category           |
| GET    | `/questions-by-category`  | Get questions by category       |
| POST   | `/add-question`           | Create a question for category  |
| GET    | `/questions`              | Get all questions               |
| PUT    | `/edit-question/:id`      | Edit question by ID             |
| DELETE | `/delete-question/:id`    | Delete question by ID           |

---

## 🧪 Running Tests

```bash
npm run test
```
Runs API unit tests using your configured test framework (e.g., Jest, Mocha).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

Crafted with ❤️ by [vinaykashyap1996](https://github.com/vinaykashyap1996)
