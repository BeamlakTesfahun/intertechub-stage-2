# Books Collection RESTful API

A RESTful API for managing a "Books Collection", developed using Node.js and MongoDB. This API allow users to perform CRUD operations on books with secure authentication and role-based access control(RBAC).

## Features

- User Authentication: Secure JWT-based authentication for accessing the API.
- Role-Based Access Control (RBAC): Specific routes are accessible based on user roles.
- Protected Routes: All CRUD operations require authentication.
- Password Security: User passwords are hashed using bcrypt for secure storage.
- Custom endpoints:
  - `/books/recommendations`: Suggest books based on the logged-in user's preferences or role.
  - `/books/favorite`: Marks a book as a user's favorite.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
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
   JWT_SECRET
```

4. Start the server:

```bash
   npm run dev
```

## API Documentation

1. **Authentication Routes**

- POST /auth/signup: Register a new user.
- POST /auth/login: Signs in an existing user.

2. **Book Management Routes**

### Admin-only Routes

- **GET /books/all**: Fetch all books from the database.
- **PUT /books/:id**: Update attributes of a book.
- **DELETE /books/:id**: Delete a book by ID.

### User-specific Routes

- **POST /books**: Add a new book to the database.
- **GET /books**: Fetch user-specific books (e.g., favorites).

#### Custom Endpoints

- **GET /books/recommendations**: Fetch a random book recommendations.
- **PUT /books/favorite**: Mark a book as a user's favorite.

## Testing Instructions

- Postman Collection: Use the Postman collection for easy testing.
  [Download Collection](https://documenter.getpostman.com/view/31313072/2sAYBd6TJm)
- Authenticate a user to get a JWT token. Register a new user and login to obtain a JWT token.
- Include the token in the Authorization header for all protected routes.

```bash
Authorization: Bearer <JWT_TOKEN>

```

- Test admin-specific and user-specific routes with appropriate roles.

## Deployment

The API is deployed and accessible at the following base URL:
Base URL: https://intertechub-stage-2.onrender.com
