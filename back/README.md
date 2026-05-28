# Schedule Backend

This README covers only the `Schedule/` folder, which contains the backend service and database configuration for the scheduling application.

## Project structure

- `docker-compose.yml` — Docker Compose configuration for the backend MySQL database and Node.js server
- `db/init.sql` — MySQL initialization script for seeding test data
- `server/` — Node.js API server built with Express and Sequelize
- `.env.example` — example environment variables for the backend

## Overview

The backend provides:
- user authentication and registration
- project management
- task creation and updates
- participant assignment to projects
- task assignment and status changes

## Prerequisites

- Docker and Docker Compose

## Environment variables

Copy `.env.example` to `.env` and update values as needed.

Example `.env`:

```env
# DB
MYSQL_HOST=db
MYSQL_ROOT_PASSWORD=root_password_change_me
MYSQL_DATABASE=ma_base_de_donnees
MYSQL_USER=user_app
MYSQL_PASSWORD=user_password_change_me

# Token
JWT_SECRET=my_secret_key

# Config Serveur
NODE_LOCAL_PORT=5000
NODE_DOCKER_PORT=5000
```

## Running with Docker Compose

From the `Schedule/` folder:

```bash
cd Schedule
docker compose up --build
```

This starts:
- MySQL database on port `3306`
- Node.js API server on the port defined by `NODE_LOCAL_PORT`

## API endpoints

### Authentication

- `POST /auth/register` — register a new user
- `POST /auth/login` — authenticate and receive a token

### Projects

- `GET /project` — get all projects you own or participate
- `POST /project` — create a new project
- `PUT /project/:id` — update a project
- `DELETE /project/:id` — delete a project
- `POST /project/:id/participants/:participantId` — add a participant
- `DELETE /project/:id/participants/:participantId` — remove a participant

### Tasks

- `GET /project/:id/task` — get tasks for a project
- `POST /project/:id/task` — create a new project task
- `PUT /task/:taskId` — update a task
- `DELETE /task/:taskId` — delete a task
- `PUT /task/:taskId/assignTo/:userId` — assign a task to a user
- `PUT /task/:taskId/removeTo` — remove task assignment
- `PUT /task/:taskId/status/:status` — change task status

### Users

- `GET /user` — list all users
- `GET /user/:projectId` — get all user who participate in a project

> Note: Except for `/auth` routes, all API routes are protected by an authentication middleware.

## Notes

- The server uses Express and Sequelize to connect to MySQL.
- Database initialization is handled by `db/init.sql` when the MySQL container starts.
- `Schedule/docker-compose.yml` orchestrates the database and backend server.
