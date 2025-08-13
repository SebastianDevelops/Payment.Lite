# Payment Orchestrator Lite

A modern payment management system with .NET Core backend and React frontend featuring enhanced Material-UI styling.

## How to Run

### Backend (.NET Core API)

#### Option 1: Docker (Recommended)
```bash
cd PaymentOrchestrator.Lite/

# Build the image
docker build -f PaymentOrchestrator.Lite.Api/Dockerfile -t paymentorchestrator .

# run image with named volume to persist sqlite data
docker run -p 5000:80 -v payment-data:/app/Data paymentorchestrator
```

#### Option 2: Local Development
```bash
cd PaymentOrchestrator.Lite.Api
dotnet restore
dotnet run
```

---
**IMPORTANT NOTE:** If running on DOCKER, make sure api.js `API_BASE` variable is http and when running LOCALLY make sure that `API_BASE` is set to https
---

Backend will be available at: `http://localhost:5000` (Docker) or `https://localhost:5000` (local)

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend will be available at: `http://localhost:3000`

## Architecture Decisions

### Backend
- **ASP.NET Core 8.0**: Modern, cross-platform web API framework
- **SQLite**: Lightweight database for simplicity and portability
- **Entity Framework Core**: ORM for database operations
- **Repository Pattern**: Service layer abstraction for business logic
- **CORS**: Configured to allow frontend communication
- **Swagger**: API documentation enabled in all environments

### Frontend
- **React 18**: Modern UI library with hooks
- **Material-UI (MUI)**: Professional component library with custom theming
- **Axios**: HTTP client for API communication
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **Modern Styling**: Gradient backgrounds, shadows, hover effects, and animations
- **Custom Theme**: Inter font family, custom color palette, and consistent spacing

### Key Design Patterns
- **Clean Architecture**: Separation of concerns with Controllers, Services, and Data layers
- **DTO Pattern**: Data transfer objects for API contracts
- **Dependency Injection**: Built-in DI container for loose coupling

### Details on the artitecutal pattern:
Primary Patterns:
1. Service Layer Pattern
IPaymentService interface + PaymentService implementation

Encapsulates business logic separate from controllers

Provides abstraction between presentation and data layers

2. Repository Pattern (implicit)
PaymentService acts as a repository for Payment entities

Abstracts data access logic from business logic

Uses Entity Framework as the underlying data access mechanism

3. Dependency Injection Pattern
Controller depends on IPaymentService interface

Service registered in DI container: builder.Services.AddScoped<IPaymentService, PaymentService>()

Promotes loose coupling and testability

4. DTO Pattern
PaymentCreateDto separates API contracts from domain models

Prevents over-posting and controls data exposure

## Styling Features

### Enhanced UI Components
- **Gradient Form Container**: Beautiful gradient background with glassmorphism effects
- **Animated Buttons**: Hover effects with transform animations and enhanced shadows
- **Modern Table Design**: Striped rows, hover effects, and professional styling
- **Status Chips**: Color-coded payment status indicators with icons
- **Responsive Layout**: Mobile-optimized design with adaptive button sizes
- **Loading States**: Smooth loading animations and progress indicators
- **Error Handling**: Toast notifications and inline error messages

## API Endpoints

### Create Payment
- **POST** `/payments`
- **Body**: 
```json
{
  "customerId": "CUST001",
  "amount": 99.99
}
```

### Get All Payments
- **GET** `/payments`

### Simulate Payment Confirmation
- **POST** `/simulate-confirmation/{paymentId}`

## Sample JSON for POST Request

```json
{
  "customerId": "CUST001",
  "amount": 99.99
}
```

## Postman Collection / Curl Commands

### Create Payment
```bash
curl -X POST http://localhost:5000/payments \
  -H "Content-Type: application/json" \
  -d '{"customerId": "CUST001", "amount": 99.99}'
```

### Get All Payments
```bash
curl -X GET http://localhost:5000/payments
```

### Confirm Payment
```bash
curl -X POST http://localhost:5000/simulate-confirmation/{payment-id-here}
```

### Postman Collection
Import these requests into Postman:
1. **POST** `http://localhost:5000/payments` with JSON body
2. **GET** `http://localhost:5000/payments`
3. **POST** `http://localhost:5000/simulate-confirmation/{{paymentId}}`

## Features

- Create new payments with customer ID and amount
- View all payments in a responsive, modern table
- Confirm pending payments with animated buttons
- Real-time UI updates after operations
- Input validation and error handling
- Mobile-responsive design with touch-friendly interactions
- Professional gradient styling and smooth animations
- Toast notifications for user feedback

## Database

SQLite database (`payments.db`) stores payment records with:
- Id (GUID)
- CustomerId (string)
- Amount (decimal)
- Status (Pending/Confirmed)
- CreatedAt (DateTime)

## Demo

![Payment Orchestrator Demo](frontend/public/demo.gif)

*Modern gradient-styled payment form and responsive table with real-time updates*

## Troubleshooting

### SQLite Database Issues
- **CRITICAL**: Always use volume mount `-v ${PWD}/PaymentOrchestrator.Lite.Api/Data:/app/Data` for SQLite persistence
- Without volume mount, database will be lost when container stops
- Ensure the `Data` directory exists in the API project folder

### General Issues
- Ensure Docker is running before building/running containers
- Check that ports 5000 (backend) and 3000 (frontend) are available
- Use `http://` (not `https://`) when accessing the Docker container
- API documentation available at `http://localhost:5000/swagger`
- For CORS issues, ensure frontend runs on `http://localhost:3000`
