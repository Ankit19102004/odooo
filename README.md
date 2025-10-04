# Expense Management Application

A full-stack expense management application with role-based access control, built with React/TypeScript frontend and Node.js/Express backend.

## Issues Fixed

### 1. PowerShell Command Syntax Error
- **Problem**: Used `&&` instead of `;` for command chaining in PowerShell
- **Solution**: Updated all terminal commands to use PowerShell-compatible syntax

### 2. Missing Backend Implementation
- **Problem**: Backend files were empty
- **Solution**: Created complete backend implementation with:
  - Express server with MongoDB integration
  - User authentication with JWT
  - Expense management API
  - Role-based access control (employee, manager, admin)

### 3. Frontend App Component Issue
- **Problem**: `App.tsx` contained CSS content instead of React code
- **Solution**: Created proper React App component with routing and authentication

### 4. Missing Dependencies
- **Problem**: Several npm packages were missing
- **Solution**: Installed all required dependencies:
  - Backend: express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken
  - Frontend: react-router-dom, recharts

### 5. TypeScript Interface Mismatch
- **Problem**: User interface inconsistencies between components
- **Solution**: Updated UserContext to match backend API response format

## Project Structure

```
odoo/
├── backend/                 # Node.js/Express backend
│   ├── config/
│   │   └── db.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── server.js          # Main server file
│   └── package.json
└── forntend/              # React/TypeScript frontend
    └── components/
        ├── components/    # React components
        ├── ui/           # UI components
        ├── styles/       # CSS styles
        ├── types/        # TypeScript definitions
        ├── App.tsx       # Main App component
        ├── main.tsx      # Entry point
        └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   NODE_ENV=development
   PORT=5000
   
   # MySQL Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=expense_management
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. Create MySQL database:
   ```sql
   CREATE DATABASE expense_management;
   ```

5. Start the backend server:
   ```powershell
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd forntend/components
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Expenses
- `POST /api/expenses` - Create expense (protected)
- `GET /api/expenses/my-expenses` - Get user's expenses (protected)
- `GET /api/expenses/all` - Get all expenses (managers/admins only)
- `GET /api/expenses/:id` - Get expense by ID (protected)
- `PUT /api/expenses/:id/status` - Update expense status (managers/admins only)

## Features

### User Roles
- **Employee**: Submit expenses, view own expenses
- **Manager**: Approve/reject expenses, view team expenses
- **Admin**: Full system access, user management

### Expense Management
- Submit expenses with receipts
- Category-based expense tracking
- Approval workflow
- Status tracking (pending, approved, rejected)
- Receipt upload support

### Dashboard
- Expense analytics and charts
- Recent activity tracking
- Approval status overview
- Role-based views

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React 18
- TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for data visualization

## Development Notes

- The project uses TypeScript for type safety
- Authentication is handled via JWT tokens
- Password hashing is implemented with bcryptjs
- CORS is configured for frontend-backend communication
- Role-based access control is implemented throughout the application

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Test the application functionality
4. Deploy to production environment
5. Add additional features as needed

## Troubleshooting

If you encounter any issues:

1. Ensure MySQL is running and accessible
2. Verify database credentials in .env file
3. Check that all dependencies are installed
4. Verify environment variables are set correctly
5. Check console logs for error messages
6. Ensure ports 5000 (backend) and 5173 (frontend) are available

