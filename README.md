# Full Stack HR Portal - Amberos Technical Test

This repository contains the complete solution for the Amberos Full Stack Engineer technical proficiency test. The project is a simple HR portal built with a Node.js backend and a React.js frontend, fully containerized with Docker for consistent and easy setup.

## ✨ Features

- [x] User Registration and Login
- [x] JWT-based Authentication & Authorization
- [x] View and Update User Profile
- [x] Frontend UI based on the provided wireframes
- [x] Comprehensive validation on both frontend and backend
- [x] **(Bonus)** Utilizes PostgreSQL as the database
- [x] **(Bonus)** Fully containerized with Docker for both development and production simulation

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript, TypeORM, PostgreSQL, JWT, Zod
- **Frontend**: React, Vite, TypeScript, TailwindCSS, React Router, React Hook Form, Axios
- **DevOps**: Docker, Docker Compose

## 🚀 Getting Started

There are two recommended ways to run this project: using Docker (for a production-like environment) or running it locally (for easier development and debugging).

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)
- [Docker](https://www.docker.com/products/docker-desktop/) & Docker Compose

---

### Method 1: Running with Docker (Recommended)

This is the easiest and most reliable way to get the entire system running, as it mirrors a real-world deployment environment.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tuongdevelop/amberos-test.git
    cd amberos-test
    ```

2.  **Ensure the `.env` file exists:**
    A `.env` file should be present in the root directory. This file contains all necessary environment variables for the database and application. The values are already configured to work with Docker Compose.

3.  **Build and Run the Containers:**
    From the root directory (`amberos-test`), run the following command:
    ```bash
    docker-compose up --build
    ```
    - `--build`: Forces Docker to rebuild the images, ensuring your latest code changes are included.
    - You can add the `-d` flag (`docker-compose up --build -d`) to run the containers in the background.

4.  **Access the Application:**
    Once all containers are up and running, you can access the services:
    - **Frontend Application**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:5001](http://localhost:5001)

5.  **Stopping the Application:**
    Press `Ctrl + C` in the terminal where `docker-compose` is running. Then, to clean up and remove the containers, run:
    ```bash
    docker-compose down
    ```

---

### Method 2: Running Locally on Your Machine

This method is ideal for active development, as it provides faster hot-reloading and direct access to debugging tools.

#### 1. Setup PostgreSQL

You need a local PostgreSQL instance running.

- **Install PostgreSQL:** Download and install from the [official website](https://www.postgresql.org/download/). During installation, you will be asked to set a password for the `postgres` superuser. **Remember this password.**
- **Create Database:** Open **pgAdmin 4** (installed with PostgreSQL), connect to your local server, and create a new database named `testdb`.

#### 2. Setup Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    There should be a `.env` file in the `backend` directory. If not, create one and update it with your local database credentials.
    ```env
    # backend/.env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=your_local_postgres_password # <-- IMPORTANT
    DB_DATABASE=testdb
    
    PORT=5001
    JWT_SECRET="a-very-strong-and-long-secret-for-jwt-token"
    JWT_EXPIRES_IN="1d"
    ```
4.  **Run the backend server:**
    ```bash
    npm run dev
    ```
    The API server will start on `http://localhost:5001`. Keep this terminal window open.

#### 3. Setup Frontend

1.  **Open a new terminal window.**
2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Configure Environment Variables:**
    Create a file named `.env.local` in the `frontend` directory with the following content:
    ```env
    # frontend/.env.local
    VITE_API_BASE_URL=http://localhost:5001/api/v1
    ```
5.  **Run the frontend server:**
    ```bash
    npm run dev
    ```
    The development server will start, typically on `http://localhost:5173`. Open this URL in your browser.