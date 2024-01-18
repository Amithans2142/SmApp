# SmApp
# Social Media App - Backend

This is the backend code for a social media app built using Node.js and MongoDB.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Amithans2142/SmApp.git

## Configure environment variables:
Create a .env file in the project root and add the following:
PORT=5000
DATABASE_URL="mongodb://0000:27017/SmApp"
JWT_SECRET=SmApp
CLOUD_NAME=
API_KEY=
API_SECRET=

## Run the application:
npm start

## API Endpoints
## Authentication
POST http://localhost:5000/register: Create a new user account.
POST http://localhost:5000/login: Log in with existing credentials.
## Posts
GET http://localhost:5000/posts: Get all posts.
POST http://localhost:5000/create: Create a new post.
PUT http://localhost:5000/update Update a post.
DELETE http://localhost:5000/delete: Delete a post.
## Likes
POST http://localhost:5000/like: Like a post.
DELETE http://localhost:5000/unlike: Unlike a post.
## Comments
POST http://localhost:5000/comment: Add a comment to a post.
DELETE http://localhost:5000/delete-comment: Delete a comment.
  

## Note:
- Replace `your-mongodb-connection-string` and `your-secret-key` in the `.env` section with your MongoDB connection string and a secret key for JWT.
- Provide additional API endpoints and details based on your actual implementation.

