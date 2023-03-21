# Todo API

This project is a simple Todo API built using Node.js, Express, and MongoDB.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/todo-api.git
   ```

2. Change the directory to the project folder:

   ```
   cd todo-api
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Update the `uri` variable in `app.js` with your MongoDB connection string.

5. Start the server:

   ```
   npm start
   ```

## API Endpoints

- GET `/api/todos`: Fetch all todos.
- GET `/api/todos/:id`: Fetch a single todo by ID.
- POST `/api/todos`: Add a new todo.
- PATCH `/api/todos/:id`: Update a todo by ID.
- DELETE `/api/todos/:id`: Delete a todo by ID.

## API Documentation

Visit `/api-docs` to view the Swagger documentation for the API.