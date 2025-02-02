# URL Shortening App

## Overview

This project is a simplified version of a URL shortening service, similar to Bit.ly. It allows users to input a long URL and receive a shortened version. When the shortened URL is accessed, it redirects to the original URL.

## Features

- **Backend:** RESTful API for URL shortening and redirection.
- **Frontend:** A simple web interface to interact with the API.
- **Database:** Stores long URLs and their corresponding shortened versions.
- **Validation:** Ensures input URLs are valid.
- **Testing:** Unit tests for backend logic and end-to-end tests for API endpoints.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** HTML, CSS, JavaScript, React
- **Testing:** Jest, Supertest

## Project Structure

### Backend

- **`src/`**: Contains the main source code for the backend.
  - **`controllers/`**: Handles request logic.
  - **`middlewares/`**: Custom middleware for request processing.
  - **`models/`**: Database models (e.g., URL model).
  - **`repositories/`**: Database interaction logic.
  - **`routes/`**: API route definitions.
  - **`services/`**: Business logic for the application.
- **`tests/`**: Contains test files for the backend.
  - **`e2e/`**: End-to-end tests.
  - **`unit/`**: Unit tests.
- **`server.ts`**: Entry point for the backend server.
- **`jest.config.ts`**: Configuration for Jest testing.
- **`nodemon.json`**: Configuration for Nodemon (auto-restart during development).
- **`tsconfig.json`**: TypeScript configuration.
- **`package.json`**: Backend dependencies and scripts.
- **`Dockerfile`**: Docker configuration for the backend.
- **`docker-compose.yml`**: Docker Compose setup for the backend.

### Frontend

- **`pages/`**: Contains Next.js pages.
  - **`api/`**: API routes for the frontend.
  - **`_app.tsx`**: Custom App component.
  - **`_document.tsx`**: Custom Document component.
  - **`index.tsx`**: Home page.
- **`public/`**: Static assets (e.g., images, fonts).
- **`styles/`**: Global and component-specific styles.
- **`.env`**: Environment variables for the frontend.
- **`next.config.ts`**: Next.js configuration.
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`tsconfig.json`**: TypeScript configuration.
- **`package.json`**: Frontend dependencies and scripts.
- **`Dockerfile`**: Docker configuration for the frontend.
- **`docker-compose.yml`**: Docker Compose setup for the frontend.

---

## Getting Started

### Prerequisites

- Node.js
- Docker
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shorten-url.git
   cd shorten-url
   ```
2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables:

### Running the application

## Without Docker

1. Start the backend:
   ```bash
   cd backend
   npm start
   cd frontend
   npm run dev
   ```

## With Docker

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

### Deployment

## Docker Deployment

1. Build the Docker images:
   ```bash
   docker-compose build
   ```
2. Deploy the containers:
   ```bash
   docker-compose up -d
   ```

## Manual Deployment

- Deploy the backend and frontend to your preferred hosting provider (e.g., Vercel, Heroku, AWS)

## API documentation

Acces to `http://localhost:5000/api-docs/`
