# Complete Setup Guide - Expense Management Application

## 🚀 **Application Successfully Created!**

Your full-stack expense management application is now complete with:
- **Backend**: Node.js + Express + MySQL + Sequelize (ES Modules)
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Database**: MySQL with proper relationships
- **Authentication**: JWT-based auth system
- **Features**: Role-based access control, expense management, approval workflows

## 📋 **Prerequisites**

1. **Node.js** (v18 or higher)
2. **MySQL** (v8.0 or higher)
3. **npm** or **yarn**

## 🗄️ **Database Setup**

### 1. Install MySQL
- Download from: https://dev.mysql.com/downloads/mysql/
- Or use MySQL Workbench for easier management

### 2. Create Database
```sql
CREATE DATABASE expense_management;
```

### 3. Configure Database Access
```sql
-- Grant privileges (if needed)
GRANT ALL PRIVILEGES ON expense_management.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

## ⚙️ **Backend Setup**

### 1. Navigate to Backend Directory
```powershell
cd backend
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Environment Configuration
The `.env` file is already created with:
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

**Update the `DB_PASSWORD` with your actual MySQL password.**

### 4. Start Backend Server
```powershell
npm start
```

The backend will:
- Connect to MySQL database
- Create tables automatically
- Start server on port 5000

## 🎨 **Frontend Setup**

### 1. Navigate to Frontend Directory
```powershell
cd forntend/components
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Frontend Server
```powershell
npm run dev
```

The frontend will start on `http://localhost:5173` or `http://localhost:5174`

## 🌐 **Access Your Application**

- **Frontend**: http://localhost:5173 (or 5174)
- **Backend API**: http://localhost:5000/api/
- **Health Check**: http://localhost:5000/api/health

## 📊 **Database Schema**

### Users Table
- `id` (Primary Key, Auto Increment)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `role` (ENUM: employee, manager, admin)
- `department` (VARCHAR)
- `managerId` (Foreign Key to Users)
- `isActive` (BOOLEAN)
- `createdAt`, `updatedAt` (Timestamps)

### Expenses Table
- `id` (Primary Key, Auto Increment)
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

## 🔐 **API Endpoints**

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

## 👥 **User Roles & Permissions**

### Employee
- Submit expenses
- View own expenses
- Edit draft expenses
- Check approval status

### Manager
- Approve/reject expenses
- View team expenses
- Escalate expenses
- View analytics

### Admin
- Full system access
- User management
- Configure approval rules
- Override approvals
- View all analytics

## 🎯 **Features**

### Expense Management
- Submit expenses with receipts
- Category-based expense tracking
- Approval workflow system
- Status tracking (pending, approved, rejected)
- Receipt upload support

### Dashboard & Analytics
- Expense analytics and charts
- Recent activity tracking
- Approval status overview
- Role-based views

### User Management
- Role-based access control
- Department management
- Manager-employee relationships
- User profile management

## 🛠️ **Technologies Used**

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization

## 🚨 **Troubleshooting**

### Common Issues

1. **MySQL Connection Error**
   - Ensure MySQL is running
   - Check credentials in .env file
   - Verify database exists

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes

3. **Module Import Errors**
   - Ensure all files use ES module syntax
   - Check package.json has "type": "module"

4. **Frontend Build Errors**
   - Run `npm install` in frontend directory
   - Check if all UI components exist

### Getting Help

1. Check console logs for error messages
2. Verify all dependencies are installed
3. Ensure MySQL service is running
4. Check environment variables are correct

## 🎉 **You're All Set!**

Your expense management application is now ready to use! The system will automatically create database tables when you start the backend server. You can register users, submit expenses, and manage the approval workflow through the web interface.

**Next Steps:**
1. Start both servers
2. Open the frontend in your browser
3. Register your first user
4. Start managing expenses!

---

**Happy coding! 🚀**
