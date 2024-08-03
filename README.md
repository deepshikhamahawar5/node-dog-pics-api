# Dog Pics API

This is a simple RESTful API for uploading and managing dog pictures.

### Prerequisites

- Node
- MongoDB(After installing Ensure MongoDB is running-sudo systemctl status mongod)

## Getting Started

1. Clone the repository
   - git clone https://github.com/deepshikhamahawar5/dog-pics-api.git
2. Install dependencies: `npm install`
3. Run the app: `npm start`

## Setting Up the JWT Secret

### Generate a Secret Key: 
    We can use any random string as the secret key. For production environments, it should be a long, complex string to ensure security. But for this assessment I’ve generated a random key using this command:

    - `openssl rand -base64 32`

### Add the Secret Key to Your .env File:
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/dogpics
    JWT_SECRET=your_generated_secret_key

## Steps to test APIs endpoints using Postman:
    Follow this documentation: https://docs.google.com/document/d/1PYrsWPmVWLEL6zjQCx935NjsKmYy35pZMwOFymI0Yps/edit#heading=h.r3gh5q42yspr

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and get a token

### Dog Pics

- `POST /api/dogs`: Upload a dog pic (requires authentication)
- `DELETE /api/dogs/:id`: Delete a dog pic (requires authentication)
- `PUT /api/dogs/:id`: Update a dog pic (requires authentication)
- `GET /api/dogs/:id`: Fetch a dog pic by ID (requires authentication)
- `GET /api/dogs`: Fetch all dog pics (requires authentication)

## Code Structure
- src/app.js - Main application file
- config/mongoose.js - MongoDB connection configuration
- tests/ - Test files for the API

## To run the test, use the following command:
- `npm test`

## We can view and interact with our MongoDB database:

## MongoDB Shell
we can use the MongoDB shell (mongosh) to interact with our database from the command line. To access your MongoDB shell
- Open a terminal.

- Run the command to start the MongoDB shell:
  `mongosh "mongodb://localhost:27017"`
- List Databases:
   `show dbs`
- Switch to a Database:
   `use dogpics`
- List Collections:
   `show collections`
- View Documents in a Collection:
   `db.collectionName.find().pretty()`