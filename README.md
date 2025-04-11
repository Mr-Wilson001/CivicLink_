# Civic_Link

Civic_Link is a Node.js-based application designed to facilitate communication between citizens and officials. It provides features such as user registration, authentication, messaging, and searching for officials. The application uses MongoDB as the database and integrates with Socket.IO for real-time messaging.

## Features

1. **User Registration and Authentication**:
   - Citizens and officials can register and log in.
   - Passwords are securely hashed using `bcrypt`.
   - JWT tokens are used for authentication.

2. **Messaging**:
   - Citizens and officials can send and receive messages.
   - Messages are stored in MongoDB and support real-time updates using Socket.IO.

3. **Official Search**:
   - Citizens can search for officials by name or position.

4. **Profile Management**:
   - Citizens and officials can view and update their profiles.

## Project Structure

```
.env
.gitignore
nodemon.json
package.json
README.md
tsconfig.json
src/
  server.ts
  controllers/
    auth.controller.ts
    message.controller.ts
    official.controller.ts
    search.controller.ts
  middlewares/
    auth.middleware.ts
  models/
    citizens.ts
    message.ts
    officials.ts
  routes/
    auth.route.ts
    message.route.ts
    official.route.ts
    search.route.ts
  utilis/
  validators/
    registerValidator.ts
```

### Key Files and Directories

- **`src/server.ts`**: Entry point of the application. Sets up Express, connects to MongoDB, and initializes routes and Socket.IO.
- **`src/controllers/`**: Contains logic for handling requests:
  - `auth.controller.ts`: Handles user registration, login, and profile retrieval.
  - `message.controller.ts`: Manages sending and retrieving messages.
  - `official.controller.ts`: Handles official profile management.
  - `search.controller.ts`: Implements search functionality for officials.
- **`src/models/`**: Defines Mongoose schemas and models:
  - `citizens.ts`: Schema for citizen data.
  - `officials.ts`: Schema for official data.
  - `message.ts`: Schema for messages.
- **`src/routes/`**: Defines API routes:
  - `auth.route.ts`: Routes for authentication and profile management.
  - `message.route.ts`: Routes for messaging.
  - `official.route.ts`: Routes for official profile management.
  - `search.route.ts`: Routes for searching officials.
- **`src/middlewares/`**: Contains middleware for authentication.
- **`src/validators/`**: Includes validation logic for user input.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CivicLink_
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: Register a citizen.
- `POST /login`: Log in a citizen.
- `GET /profile`: Get the profile of the logged-in citizen.
- `POST /official/register`: Register an official.
- `POST /official/login`: Log in an official.

### Messaging (`/api/messages`)
- `POST /`: Send a message (authenticated).
- `GET /`: Retrieve messages (authenticated).

### Officials (`/api/officials`)
- `GET /profile`: Get the profile of the logged-in official (authenticated).
- `PATCH /uProfile`: Update the profile of the logged-in official (authenticated).

### Search (`/search`)
- `GET /officials`: Search for officials by name or position.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **Real-time Communication**: Socket.IO
- **Validation**: express-validator
- **Environment Variables**: dotenv

## Development

- **Run in Development Mode**:
  ```bash
  npm run dev
  ```
  This uses `nodemon` to watch for file changes and restart the server automatically.

- **Compile TypeScript**:
  ```bash
  npx tsc
  ```

## License

This project is licensed under the ISC License.
```

This README.md provides a comprehensive overview of your project, including its features, structure, installation steps, API endpoints, and technologies used.