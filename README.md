# kanban-project

## Table of Contents

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Running the project](#Running-the-project)
- [Access](#Access)
- [Additional Notes](#Additional-Notes)

## Prerequisites
Before running the project, ensure you have the following installed on your system:

Node.js (v14.x or higher)
npm (v6.x or higher) or yarn
MongoDB (local installation or a cloud instance like MongoDB Atlas)

## Installation
Follow these steps to set up the project on your local machine:

Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

Install dependencies for the frontend
Navigate to the frontend (Next.js) folder and install the necessary dependencies.

```bash
cd client
npm install
```

Install dependencies for the backend
Navigate to the backend (Node.js) folder and install the necessary dependencies.

```bash
cd ../server
npm install
```

# Configuration

1. Backend (Node.js)

Create a .env file in the backend folder with the following details:

```bash
APP_PORT=8080
DB_PORT=27017 
NODE_ENV=development
```

Make sure MongoDB is running on the specified mongodb port. If using MongoDB Atlas, replace the local connection string with your Atlas URI.


# Running the project

1. Start the Backend

Navigate to the backend folder and start the server:

```bash
cd server
npm run dev
```

This will start the backend server on http://localhost:8080.

2. Start the Frontend

Navigate to the frontend folder and start the Next.js app:

```bash
cd ../client
npm run dev
```

The frontend will be available at http://localhost:3000.

# Access
Once both the frontend and backend are running:

Frontend (UI): Open your browser and navigate to http://localhost:3000 to access the Kanban project management app.
Backend (API): The backend API will be available at http://localhost:8080.

# Additional Notes

The design is responsive, and the app supports English and German translations.
Tasks can be added, moved between columns, deleted, and searched through the interface.
Make sure MongoDB is running to persist the task data.
Feel free to contact me if you encounter any issues during setup or have questions.