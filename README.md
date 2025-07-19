Thank you for your clarification — you're absolutely right.

Below is the **entire `README.md` content**, complete and structured fully in **Markdown format**, covering **setup, all API endpoints, error formats, tech stack, testing, folder structure, and more**, based on your assignment:

---

````markdown
# 📚 Library Management API

A **RESTful API** for a Library Management System built using **Express**, **TypeScript**, and **MongoDB (via Mongoose)**. This system manages books and borrow records with proper validation, business logic, and filtering capabilities.

---

## 🚀 Features

- 📘 Book CRUD (Create, Read, Update, Delete)
- 📦 Borrow books with quantity and availability checks
- 🔍 Filtering and sorting books
- 📊 Aggregation summary of borrowed books
- 🔄 Mongoose middleware (`pre`, `post`) usage
- 📌 Static or instance methods in Mongoose
- ✅ Schema-level validations
- 🧪 Consistent error handling

---

## 🧰 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Postman** (for testing)

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js v18+
- MongoDB (Local or Atlas)
- npm or yarn

### 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
```

4. Run the app:

* For development:

```bash
npm run dev
```

* For production:

```bash
npm run build
npm start
```

The server will be running at: [http://localhost:5000](http://localhost:5000)

---

## 📘 API Documentation

### 🌐 Base URL

```
http://localhost:5000/api
```

---

## 📗 Book Endpoints

### ➕ Create Book

**POST** `/api/books`

#### Request Body

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 📚 Get All Books

**GET** `/api/books`

Supports filtering and sorting.

#### Example Query

```
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

#### Query Parameters

* `filter`: Filter by genre
* `sortBy`: Field to sort (e.g. `createdAt`)
* `sort`: `asc` or `desc`
* `limit`: Number of results

---

### 🔍 Get Book by ID

**GET** `/api/books/:bookId`

#### Success Response

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### ✏️ Update Book

**PUT** `/api/books/:bookId`

#### Example Request

```json
{
  "copies": 50
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "copies": 50,
    ...
  }
}
```

---

### ❌ Delete Book

**DELETE** `/api/books/:bookId`

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

## 📦 Borrow Endpoints

### ✅ Borrow a Book

**POST** `/api/borrow`

#### Request Body

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Business Logic

* Validates that `copies >= quantity`
* Deducts the quantity from book’s available copies
* If `copies == 0`, sets `available = false` (via instance/static method)
* Creates a borrow record

#### Success Response

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "...",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 📊 Borrow Summary

**GET** `/api/borrow`

Uses **aggregation** to summarize borrow data.

#### Output Example

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

---

## ❗ Error Response Format

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 🧪 Testing the API

You can use tools like:

* **Postman**
* **Thunder Client (VS Code Extension)**

Make sure your MongoDB instance is running or that you're connected to a valid remote database (e.g., MongoDB Atlas).

---

## 🗂️ Project Folder Structure

```
📦src
 ┣ 📂controllers      → Request handlers
 ┣ 📂models           → Mongoose schemas & methods
 ┣ 📂routes           → Route definitions
 ┣ 📂middlewares      → Custom middleware (error handling, etc.)
 ┣ 📂utils            → Helper functions (optional)
 ┣ 📜app.ts           → App config and middleware setup
 ┗ 📜server.ts        → Entry point
```

---

## 📹 Video Walkthrough

🎥 [Watch Video Demo](https://your-video-link.com)

---

## 👤 Author

* **Your Name**
* GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

This project is intended for educational purposes as part of an assignment.
**Plagiarism will result in disqualification.**

---

## ⏰ Submission Deadlines

* ✅ **Full Marks (60):** Jun 21, 2025 – 11:59 PM
* ✅ **Partial Marks (50):** Jun 22, 2025 – 11:59 PM
* ⚠️ **Reduced Marks (30):** After Jun 22, 2025

```

---

✅ This is now the **complete `README.md` in one single markdown block**, ready to paste into your project.

Let me know if you want:
- A downloadable `.md` file,
- The `.env.example`,
- Postman collection,
- Customization (repo URL, author name, etc.).
```
