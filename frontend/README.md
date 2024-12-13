# Frontend README

## Description
This is the frontend for the Invoice Management System. It is built using **React** with **TypeScript**, **Redux Toolkit**, and **React Query**. The frontend consumes APIs exposed by the backend to manage authentication and invoices.

## Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

## Setup Instructions

### 1. Install Dependencies
Navigate to the `frontend` folder and run:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
This starts the frontend server at `http://localhost:5173`.


## Features
- **Authentication**: Login functionality using JWT tokens
- **Invoice Management**:
  - List invoices with pagination
  - View detailed invoice information in a modal
- **Error Handling**: Displays error messages for failed API requests

## Project Structure
- **Components**: Contains reusable React components (e.g., `InvoiceList`, `Modal`)
- **Redux**: Manages application state using Redux Toolkit
- **Validation**: Uses Zod for schema-based validation

## Additional Commands
- **Linting**:
  ```bash
  npm run lint
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```


