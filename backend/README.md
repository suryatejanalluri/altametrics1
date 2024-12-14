# Backend README

## Description
This is the backend for the Invoice Management System. It provides APIs for authentication, invoice management, and pagination. The backend is built using **NestJS**, **Prisma ORM**, and **PostgreSQL**.

## Prerequisites
- **Node.js** (v18.18 or higher)
- **npm** (v7 or higher)
- **Docker** and **Docker Compose**

## Setup Instructions

### 1. Install Dependencies
```bash
npm install -g @nestjs/cli
npm install
```

### 2. Initialize Prisma
Run the following commands to set up the database:
```bash
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### 3. Run the Backend Server
```bash
npm start run
```

### 4. Environment Variables
Create a `.env` file in the `backend` folder with the following:
```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/invoicedb
JWT_SECRET=<your_jwt_secret>
```
You can try with the same credentials or you can replace `<username>` and `<password>` with your PostgreSQL credentials.

## API Endpoints

### Authentication
- **POST /auth/login**: Authenticate a user and return a JWT token

### Invoices
- **GET /invoices**: Retrieve paginated list of invoices
- **GET /invoices/:id**: Retrieve details of a specific invoice
- **GET /invoices/total**: Retrieve a data aggregation of the total amount due by due date

## Additional Commands
- **Generate Prisma Client**:
  ```bash
  npx prisma generate
  ```
- **Linting**:
  ```bash
  npm run lint
  ```

---
