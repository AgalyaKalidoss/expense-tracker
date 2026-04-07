````markdown
# 💼 Expense Tracker Web Application

A secure full-stack web application to manage income and expenses with user authentication and basic analytics.

---

## Backend Setup

### 1. Go to backend folder
```bash
cd backend
````

### 2. Clean dependencies

```bash
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

### 3. Install packages

```bash
npm install
npm install express cors body-parser
```

### 4. Run server

```bash
node server.js
```

or

```bash
npm start
```

### Output

Server running on port 3000

---

## Project Overview

Expense Tracker is a full-stack application that allows users to track income and expenses, view balances, and analyze spending through a dashboard.

---

## Features

* User registration and login
* Add income and expenses
* View and delete records
* Date-based filtering
* Dashboard with charts
* Balance calculation
* Responsive UI

---

## Tech Stack

Frontend:

* HTML, CSS, Bootstrap
* JavaScript, Axios, Chart.js

Backend:

* Node.js, Express.js
* JWT authentication
* bcrypt

Database:

* MongoDB

---

## Folder Structure

```
expense-tracker/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   └── view-records.html
│
└── README.md
```

---

## Installation

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

cd backend
npm install

mongod

node server.js
```

Open `login.html` in browser.

---

## API Endpoints

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | /register    | Register user  |
| POST   | /login       | Login user     |
| POST   | /income      | Add income     |
| POST   | /expense     | Add expense    |
| GET    | /expense     | Get expenses   |
| DELETE | /expense/:id | Delete expense |
| GET    | /dashboard   | Dashboard data |

---

## Security

* Password hashing with bcrypt
* JWT authentication
* Protected routes

---

## Author

Agalya Kalidoss
Full Stack Developer

```
```
