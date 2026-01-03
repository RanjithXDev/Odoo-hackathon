# Globe Trotter Backend API

A comprehensive Node.js/Express REST API backend for the Globe Trotter travel planning application with JWT authentication, MongoDB database, and full CRUD operations for trips, itineraries, and budgets.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password reset with email
  - Protected routes with middleware

- **Trip Management**
  - Create, read, update, delete trips
  - Upload trip cover images
  - Share trips with public links
  - Track destinations and budgets

- **Itinerary Builder**
  - Add, edit, delete activities
  - Organize activities by date and time
  - Categorize activities
  - Track costs and duration

- **Budget Tracking**
  - Set total trip budget
  - Add expenses by category
  - Get budget breakdown
  - Track spending vs budget

- **User Profile**
  - Update profile information
  - Upload avatar
  - View trip statistics
  - Contact number management

- **Search & Discovery**
  - Search cities and destinations
  - Browse activities
  - Popular destinations

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/globe-trotter
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@globetrotter.com
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI with your Atlas connection string
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "contactNumber": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password/:resetToken
Content-Type: application/json

{
  "password": "newpassword123"
}
```

### Trip Endpoints

#### Get All Trips
```http
GET /api/trips
Authorization: Bearer <token>
```

#### Create Trip
```http
POST /api/trips
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "European Adventure",
  "description": "Summer trip across Europe",
  "startDate": "2026-06-01",
  "endDate": "2026-06-15",
  "destinations": ["Paris", "Rome", "Barcelona"],
  "budget": 3500,
  "coverImage": <file>
}
```

#### Get Trip Details
```http
GET /api/trips/:id
Authorization: Bearer <token>
```

#### Update Trip
```http
PUT /api/trips/:id
Authorization: Bearer <token>
```

#### Delete Trip
```http
DELETE /api/trips/:id
Authorization: Bearer <token>
```

#### Share Trip
```http
POST /api/trips/:id/share
Authorization: Bearer <token>
```

#### Get Shared Trip (Public)
```http
GET /api/trips/shared/:token
```

### Itinerary Endpoints

#### Get Trip Itinerary
```http
GET /api/itineraries/trip/:tripId
Authorization: Bearer <token>
```

#### Add Activity
```http
POST /api/itineraries/:id/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Eiffel Tower Visit",
  "description": "Visit the iconic landmark",
  "location": "Paris, France",
  "date": "2026-06-05",
  "time": "10:00",
  "duration": 120,
  "cost": 25,
  "category": "activities"
}
```

#### Update Activity
```http
PUT /api/itineraries/:id/activities/:activityId
Authorization: Bearer <token>
```

#### Delete Activity
```http
DELETE /api/itineraries/:id/activities/:activityId
Authorization: Bearer <token>
```

### Budget Endpoints

#### Get Trip Budget
```http
GET /api/budgets/trip/:tripId
Authorization: Bearer <token>
```

#### Add Expense
```http
POST /api/budgets/:id/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "food",
  "amount": 50,
  "description": "Dinner at local restaurant",
  "date": "2026-06-05"
}
```

#### Get Budget Breakdown
```http
GET /api/budgets/:id/breakdown
Authorization: Bearer <token>
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "contactNumber": "+9876543210"
}
```

#### Upload Avatar
```http
POST /api/users/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "avatar": <file>
}
```

#### Get User Statistics
```http
GET /api/users/stats
Authorization: Bearer <token>
```

### Search Endpoints (Public)

#### Search Cities
```http
GET /api/search/cities?query=paris&limit=10
```

#### Search Activities
```http
GET /api/search/activities?city=Paris&category=activities
```

#### Get Popular Destinations
```http
GET /api/search/popular?limit=10
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── tripController.js    # Trip management
│   ├── itineraryController.js
│   ├── budgetController.js
│   ├── userController.js
│   └── searchController.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Global error handling
│   └── upload.js            # File upload config
├── models/
│   ├── User.js              # User schema
│   ├── Trip.js              # Trip schema
│   ├── Itinerary.js         # Itinerary schema
│   └── Budget.js            # Budget schema
├── routes/
│   ├── auth.js
│   ├── trips.js
│   ├── itineraries.js
│   ├── budgets.js
│   ├── users.js
│   └── search.js
├── utils/
│   └── emailService.js      # Email utilities
├── uploads/                 # Uploaded files
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/globe-trotter` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Email username | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Email password/app password | `your-app-password` |
| `EMAIL_FROM` | From email address | `noreply@globetrotter.com` |
| `FRONTEND_URL` | Frontend URL for reset links | `http://localhost:5173` |

## 📧 Email Configuration

For password reset emails, you need to configure an email service:

### Using Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASSWORD`

## 🧪 Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **cURL**: Command-line testing
- **Frontend**: Connect your React frontend

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## 🚀 Deployment

### Deploy to Heroku:
```bash
heroku create globe-trotter-api
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

### Deploy to Railway/Render:
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

For support, email support@globetrotter.com or open an issue in the repository.

---

Built with ❤️ for Globe Trotter
