# Books Collection RESTful API

A RESTful API for managing a "Books Collection", developed using Node.js and MongoDB. This API allow users to perform CRUD operations on books while ensuring proper data validation.

## Features

- Perform CRUD operations (Create, Read, Update, Delete) on books.
- Custom endpoints:
  - `/books/recommendations`: Suggests a random book.
  - `/books/favorite`: Marks a book as your favorite.
- Data validation
- Database integration with MongoDB

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Validation**: Express-validator

## Setup Instructions

1. Clone the repository:

```bash
   git clone https://github.com/BeamlakTesfahun/intertechub-stage-2.git
   cd intertechub-stage-2
```

2. Install dependencies:

```bash
   npm install
```

3. Create a .env file and specify the port and MongoDB URI

```env
   PORT
   MONGO_URI
```

4. Start the server:

```bash
   npm run dev
```

## API Documentation

- POST /books: Add a new book to the database.
- GET /books: Fetch all books from the database.
- PUT /books/:id: Update a book by ID.
- DELETE /books/:id: Delete a book by ID.
- GET /books/recommendations: Fetch a random book recommendations.
- PUT /books/favorite: Mark a book as favorite.
