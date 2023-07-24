# News Explorer API

News Explorer API is a server-side component of a web-based application for browsing and saving news articles, built with Node.js, Express, and MongoDB. The server supports user registration, login, and token-based authentication for protected routes.

This repository was created with a specific workflow and structure to support a news-exploring feature set. Here's a brief outline of the steps taken to create and organize the project:

## Project Setup
1. Initialized the repository with necessary infrastructural files like .gitignore, .editorconfig, .eslintrc, and package.json.
2. Set up NPM scripts for development and production modes. The `dev` command starts the project in development mode with hot-reloading, and `start` runs it in production mode.

## Data Modeling
1. Created MongoDB schemas and models for two main entities: User and Article.
2. User schema includes fields for email (validated against email schema, unique for each user), password (stored as a hash, not returned by default), and name.
3. Article schema includes fields for keyword, title, text, date, source, link (validated as URL), image (validated as URL), and owner (references User _id and not returned by default).

## Routes and Controllers
1. Developed routes and controllers for serving API endpoints.
2. Protected routes (`/users/me`, `/articles`, `POST /articles`, `DELETE /articles/:articleId`) with JWT-based authorization.
3. Non-protected routes for user registration (`POST /signup`) and login (`POST /signin`).

## Authentication and Authorization
1. Implemented user registration and login routes with password encryption.
2. Upon successful login or registration, the server responds with a JWT to be used for subsequent authenticated requests.

## Logging
1. Configured the application to keep logs in JSON format in two separate files: request.log (for API requests) and error.log (for errors).
2. Excluded log files from the repository with .gitignore.

For detailed implementation and usage, refer to the sections below.

## Getting Started

Clone the repository and install dependencies with `npm install`. You can start the server in development mode with `npm run dev` and in production mode with `npm start`.

## Features and Usage

The API supports the following operations:

- User registration (`POST /signup`) and login (`POST /signin`). On successful login or registration, a JWT is returned for subsequent authenticated requests.
- Fetch current user's profile information (`GET /users/me`).
- Fetch all articles saved by the current user (`GET /articles`).
- Save a new article (`POST /articles`).
- Delete an existing article by its _id (`DELETE /articles/:articleId`).

Remember to include the JWT in the Authorization header (as Bearer token) for the authenticated requests.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Maty Tsoraro - maty.tsoraro@gmail.com

Project Link: [https://github.com/MatyTsoraro/news-explorer-api](https://github.com/MatyTsoraro/news-explorer-api)

Deployed Site: [https://news-explorer-api-three.vercel.app](https://news-explorer-api-8g985.kinsta.app/)
