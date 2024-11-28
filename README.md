# Todo MERN Application

A full-stack Todo application built using the MERN stack (MySQL w/ TypeORM, Express, React, Node.js).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v18 or higher)
- npm / pnpm / yarn (pnpm prefered)
- a `mysql` server 

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mortezaom/todo-mern.git
    cd todo-mern
    ```

2. Install dependencies for both backend and frontend:
    ```sh
    pnpm install
    ```

## Update .env file

After installing dependencies, you need to update `.env` file in the backend folder.
You can copy the `.env.example` file and then fill it with your own config

## Running the Application

To run the application, you can start both the backend and frontend servers simultaneously using the following command:

```sh
npm start
```

This will run the following scripts:

- Backend: `npm run dev -w backend`
- Frontend: `npm run dev -w frontend`

The backend server will start using `nodemon` on port `:8000`, and the frontend server will start using `vite` on port `:5173`.

## Project Structure

The project is divided into two main parts: `backend` and `frontend`.

### Backend

The backend is built with Express and TypeORM, and it includes the following main dependencies:

- express
- typeorm
- bcryptjs
- jsonwebtoken
- mysql

To start the backend server individually:

```sh
cd backend
npm run dev
```

### Frontend

The frontend is built with React and Vite, and it includes the following main dependencies:

- react
- tailwindcss
- vite
- zustand
- headless ui

To start the frontend server individually:

```sh
cd frontend
npm run dev
```

## Features

- User Authentication (JWT)
- CRUD operations for Todos
- Reordering Todos
- Responsive UI with React
