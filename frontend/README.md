# Frontend README

## Description
This is the frontend for the Invoice Management System. It is built using **React** with **TypeScript**, **React Context** for authentication, **Redux** for invoice state management, and **React Query** for data fetching. The frontend consumes APIs exposed by the backend to manage authentication and invoices.

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
- **Authentication**: 
  - Login functionality using JWT tokens
  - Token expiration handling
  - Protected routes
- **Invoice Management**:
  - List invoices with pagination
  - View detailed invoice information in a modal
  - Real-time data fetching with React Query
  - Global state management with Redux
- **Error Handling**: 
  - Displays user-friendly error messages
  - Form validation
  - API error handling

## Project Structure
- **src/**
  - **components/**: Reusable React components
    - `Login.tsx`: Authentication component
    - `InvoiceList.tsx`: Invoice management
    - `Modal.tsx`: Reusable modal component
    - `Header.tsx`: Navigation header
  - **context/**
    - `AuthContext.tsx`: Authentication state management
  - **redux/**
    - `store.ts`: Redux store configuration
    - `invoiceSlice.ts`: Invoice state management
  - **styles/**: CSS modules for styling
  - **validation/**: Zod schemas for data validation
  - **utils/**: Helper functions and utilities

## State Management
- **Authentication**: Managed through React Context (AuthContext)
- **Invoice Data**: Managed through Redux store
- **Server State**: Handled by React Query for efficient caching and real-time updates

## Additional Commands
- **Linting**:
  ```bash
  npm run lint
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```

## Security Features
- JWT token-based authentication
- Protected routes requiring authentication
- Automatic token expiration handling
- Secure password handling
