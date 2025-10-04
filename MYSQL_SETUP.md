# MySQL Setup Guide

## Quick Setup Instructions

### 1. Install MySQL
- Download MySQL from: https://dev.mysql.com/downloads/mysql/
- Or use MySQL Workbench for easier management
- Or install via package manager (Chocolatey, Homebrew, etc.)

### 2. Create Database
```sql
CREATE DATABASE expense_management;
```

### 3. Create .env File
Create a `.env` file in the `backend` directory with:

```env
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

### 4. Start the Application
```powershell
# Backend
cd backend
npm start

# Frontend (in another terminal)
cd forntend/components
npm run dev
```

## Database Schema

The application will automatically create the following tables:

### Users Table
- `id` (Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `role` (ENUM: employee, manager, admin)
- `department` (VARCHAR)
- `managerId` (Foreign Key to Users)
- `isActive` (BOOLEAN)
- `createdAt`, `updatedAt` (Timestamps)

### Expenses Table
- `id` (Primary Key)
- `employeeId` (Foreign Key to Users)
- `amount` (DECIMAL)
- `description` (TEXT)
- `category` (ENUM: travel, meals, office supplies, transportation, accommodation, other)
- `date` (DATE)
- `status` (ENUM: pending, approved, rejected)
- `approvedById` (Foreign Key to Users)
- `approvedAt` (DATE)
- `rejectionReason` (TEXT)
- `receipt` (VARCHAR)
- `notes` (TEXT)
- `createdAt`, `updatedAt` (Timestamps)

## Troubleshooting

### Connection Issues
1. Ensure MySQL service is running
2. Check if the port 3306 is available
3. Verify username and password in .env file
4. Make sure the database exists

### Permission Issues
1. Grant proper privileges to your MySQL user:
   ```sql
   GRANT ALL PRIVILEGES ON expense_management.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Port Conflicts
- If port 3306 is in use, change `DB_PORT` in .env file
- If port 5000 is in use, change `PORT` in .env file
