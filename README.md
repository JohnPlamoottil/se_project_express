# Express.js
### Sprints 12, 13, 14, 15 Backend (WTWR: What to Wear?)

Domain: [What to Wear](https://wtwr-jjsprint15.chickenkiller.com/)

This is the 'server' side which is called SE_Project_Express - Backend

The back-end project is focused on creating a server for the WTWR application using MongoDB Compass. 

You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. 

The eventual goal is to create a server with an RESTful API and user authorization.

This project helps users manage their wardrobe items and determine what to wear based on the weather. 

## Prior to Submitting
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. 

The file `sprint.txt` should contain the number of the sprint you're currently working on. Only for sprints 12 and 13

## Project Functionality
Users can:
- View a collection of clothing items.
- Add a new item (with name, image URL, and weather suitability).
- Like or dislike items.
- Delete items they own.

## Technologies and Techniques Used

- **Node.js** & **Express.js** – backend server and routing
- **MongoDB** & **Mongoose** – database and object modeling
- **ESLint** – code linting using Airbnb + Prettier config
- **REST API** – standardized API structure
- **Middleware** – for centralized error handling and mock authorization
- **Environment-based configuration** – using `process.env`

# Sprint 12
Introduction to Backend - Node.js and Express.js
## Project 12
se_project_express

### Overview:

- Intro
- Features
- Links

### Intro:

- The back-end portion of this project is focused on creating a server for the WTWR application.

- With it I gained a deeper understanding of how to work with databases, set up security and testing, and deployed web applications on a remote machine.

- The eventual goal is to create a server with an API and user authorization, for which this project served as a first step.

- This project can be run with these prompts:

- - `npm run start` — to launch the server

- - `npm run dev` — to launch the server with the hot reload feature

### Features:

- Server-Side Development
- Node.js
- Express.js
- Postman
- REST API
- Databases
- MongoDB
- SQL

# Sprint 13
Back-End Authentication and Authorization
## Project 13
se_project_express

### Overview:
- Intro
- Features
- Links

### Intro:
This phase of the WTWR project focuses on implementing user authentication and authorization features. The key additions include:

- User registration and login functionality with secure password handling
- JWT (JSON Web Token) based authentication
- Protected routes that require user authentication
- User authorization to ensure users can only modify their own data
- Enhanced error handling and input validation using regular expressions

This implementation ensures secure user management while maintaining the RESTful architecture established in the previous sprint.

This project can be run with these prompts:

- `npm run start` — to launch the server

- `npm run dev` — to launch the server with the hot reload feature

### Features:

- Server-Side Authentication and Authorization
- Authentication Methods
- Authorization Methods
- JS Web Tokens
- JS Regular Expressions (Regexs)

# Sprint 14
Back-End Authentication and Authorization
## Project 14
### WTWR - full stack
se_project_react

se_project_express

### Overview:
- Intro to Front-End Authentication with React
- Intro to Web Application Security
- Links

### Intro:
This project represents an important first in your software engineer journey: you’ll connect your frontend and backend and create a full-stack application. In this project, you'll:

Implement the logic for signing up, signing in, and signing out
Add new context to store data about the current user
Implement the logic for editing a profile
Implement the ability for users to add likes to clothing items
In the process, you'll also utilize the API you created in projects 12 and 13 to send fetch requests.

This implementation ensures secure user management while maintaining the RESTful architecture established in the previous sprint.

This project can be run with these prompts:

- `npm run start` — to launch the server
- cd server_se_project_express
- cd web_se_project_react
- `npm run dev` — to launch the server with the hot reload feature
- this launches the server as a local host
- next sprint will deploy this website to the web
  
### Features:
- Front End Authentication and Authorization 
- Web Security
- JS Web token on the frontend


### Github Links:
se_project_react: [Frontend](https://github.com/JohnPlamoottil/se_project_react)

se_project_express: [Backend](https://github.com/JohnPlamoottil/se_project_express)

### Postman Link:

Sprints 12 & 13 Tests: [Postman](https://www.postman.com/jjplamoottil)

