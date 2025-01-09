# E-Commerce Dashboard Project

This is a beginner-friendly E-Commerce Dashboard built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, log in, view products, and enables admins to manage product listings.

## Project Structure

### Backend
Handles server-side logic, API routes, and database interactions.
- `db/`: Database configuration and models.
- `index.js`: Backend entry point.

### Frontend
Manages the user interface and client-side logic.
- `src/components/`: React components like `AddProducts`, `login`, and `ProductList`.
- `App.jsx`: Main React app component.

## Features
- User Authentication with JWT (Sign Up/Login) for secure sessions User Authentication (Sign Up/Login)
- Add, Update, and Display Products
- Protected Routes for Secure Access
- Organized File Structure for Scalability

## Prerequisites
- Node.js (16.x or higher)
- MongoDB (5.0 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ecommerce-dashboard
   ```

2. Install dependencies:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. Start the application:
   - Backend:
     ```bash
     cd backend
     node index.js
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```

4. Open the app at `http://localhost:5173`.

## Technologies Used

- **Frontend:** React.js, CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB


