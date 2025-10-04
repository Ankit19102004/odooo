# Enterprise Expense Reimbursement Management System

A comprehensive full-stack application for managing expense reimbursements with multi-level approval workflows, role-based access control, and modern UI.

## Features

- **Authentication & User Management**: JWT-based authentication with auto-company creation
- **Role-Based Access Control**: Admin, Manager, Employee roles with hierarchical permissions
- **Expense Management**: Submit expenses with currency conversion and receipt upload
- **Multi-Level Approval Workflow**: Configurable approval rules and conditional flows
- **Modern UI**: React frontend with Material-UI, dark/light mode, and responsive design
- **Real-time Updates**: Track expense status and approval progress
- **Currency Support**: Multi-currency support with automatic conversion

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA with Hibernate
- MySQL/PostgreSQL
- Maven

### Frontend
- React 18
- Material-UI (MUI)
- Redux Toolkit
- React Query
- Axios
- React Router

## Project Structure

```
expense-management-system/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml      # Docker configuration
└── README.md
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Docker (optional)
- MySQL/PostgreSQL

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Docker Setup
```bash
docker-compose up -d
```

## API Documentation
The backend provides REST APIs documented via Swagger UI at `http://localhost:8080/swagger-ui.html`

## License
MIT License

