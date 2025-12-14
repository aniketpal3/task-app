# 🗂️ Task Management Web Application (TASK-APP)

A **Kanban-style Task Management Web Application** inspired by **Trello / Notion Tasks**. This project is built with **React + Vite** and allows users to manage tasks across multiple boards with drag-and-drop, filtering, sorting, and persistent storage using **localStorage**.

---

## 🚀 Features

### 📌 Board Layout

* 3-column layout:

  * **To-Do**
  * **In-Progress**
  * **Completed**
* Each column displays task cards
* Responsive design (Mobile, Tablet, Desktop)
* Top navigation bar with app title and **Add Task** button

---

### 📝 Task Management (CRUD)

Each task includes:

* Title
* Description
* Priority (Low / Medium / High)
* Due Date
* Creation Timestamp
* Status (Board)

#### ➕ Create Task

* Tasks are created using a modal popup form

#### ✏️ Edit Task

* Click on a task card to edit any field
* Status can be changed manually or via drag & drop

#### 🗑️ Delete Task

* Delete option with confirmation prompt

---

### 🔀 Drag & Drop

* Drag tasks between boards:

  * To-Do → In-Progress → Completed
* Status updates instantly on drop
* Implemented using **react-beautiful-dnd**

---

### 🔍 Filtering & Sorting

#### Filters

* Priority (Low / Medium / High)
* Due Date
* Status (Board)

#### Sorting

* Oldest First
* Newest First
* Closest Due Date

---

### ⚠️ Duplicate Task Handling

If multiple tasks have the same title in the same board:

* Displays a **Duplicate Task** badge
  **OR**
* Appends numbering like *(1), (2)*

---

## 💾 Data Handling

* Initial tasks are loaded from a static JSON file
* All task updates are saved in **localStorage**
* Data persists after page refresh

### Example `tasks.json`

```json
[
  {
    "id": 101,
    "title": "Design Homepage UI",
    "description": "Create wireframes and layout structure",
    "priority": "High",
    "status": "To-Do",
    "dueDate": "2025-02-12T09:00:00Z",
    "createdAt": "2025-01-25T14:10:00Z"
  }
]
```

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS / Vanilla CSS
* react-beautiful-dnd
* date-fns / dayjs
* localStorage

---

## 📂 Project Structure

```
TASK-APP/
│── node_modules/
│── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   ├── Filters.jsx
│   │   ├── Navbar.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskModal.jsx
│   │
│   ├── data/
│   │   └── tasks.json
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
│── .gitignore
│── eslint.config.js
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
│── README.md
```

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-app.git
###
cd task-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Project

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📱 Responsive Design

* Mobile-first layout
* Adaptive columns
* Smooth drag & drop interactions

---

## ✅ Evaluation Checklist

* ✔ Clean UI / UX
* ✔ Modular React components
* ✔ CRUD functionality
* ✔ Drag & Drop support
* ✔ Filters & Sorting
* ✔ localStorage persistence
* ✔ Clear README documentation

---

## 👨‍💻 Author

**Aniket Pal**

---

⭐ If you find this project useful, consider giving it a star!
