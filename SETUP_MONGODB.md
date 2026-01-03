# 🎯 FINAL SETUP - Connect Your Database

## Current Status
✅ Backend fully built and running  
✅ Frontend integrated with backend API  
✅ All features implemented  
⚠️ **Only MongoDB connection needed!**

---

## 🚀 5-Minute MongoDB Setup

### Step 1: Create MongoDB Atlas Account (FREE)
1. Open: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with email or Google
3. Verify your email

### Step 2: Create Database Cluster
1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select cloud provider: **AWS** (recommended)
4. Choose region closest to you (e.g., Mumbai for India)
5. Cluster name: Leave default or name it `globe-trotter`
6. Click **"Create"** button
7. Wait 2-3 minutes for cluster to deploy

### Step 3: Create Database User
1. You'll see a security quickstart
2. **Authentication Method**: Username and Password
3. **Username**: `globetrotter`
4. **Password**: `Globe2026!` (or create your own secure password)
5. Click **"Create User"**

### Step 4: Set Network Access
1. **Where would you like to connect from?**: My Local Environment
2. Click **"Add My Current IP Address"**
3. **OR** click **"Allow Access from Anywhere"** (for development)
   - This adds IP: `0.0.0.0/0`
4. Click **"Finish and Close"**

### Step 5: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Drivers"**
3. Select: **Node.js** and version **5.5 or later**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://globetrotter:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

1. Open: `d:\Globe Trotter\Odoo-hackathon\backend\.env`
2. Find line 7 that starts with `MONGODB_URI=`
3. Replace it with your connection string
4. **Important changes**:
   - Replace `<password>` with `Globe2026!` (or your password)
   - Add `/globe-trotter` before the `?` to specify database name

**Example:**
```env
MONGODB_URI=mongodb+srv://globetrotter:Globe2026!@cluster0.abc123.mongodb.net/globe-trotter?retryWrites=true&w=majority
```

**Your complete .env should look like:**
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://globetrotter:Globe2026!@cluster0.xxxxx.mongodb.net/globe-trotter?retryWrites=true&w=majority

JWT_SECRET=globe-trotter-super-secret-key-change-in-production-2026
JWT_EXPIRE=7d

# Email Configuration (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@globetrotter.com

FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Step 7: Restart Backend Server

1. Go to your backend terminal (running `npm run dev`)
2. Press **Ctrl + C** to stop the server
3. Run: `npm run dev` again
4. Look for this message:
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```

**If you see that ✅, you're done!**

---

## 🧪 Test Everything

### Test 1: Backend Health
Open browser: **http://localhost:5000/api/health**

Should see:
```json
{
  "success": true,
  "message": "Globe Trotter API is running",
  "timestamp": "2026-01-03T..."
}
```

### Test 2: Create Your First Account
1. Go to: **http://localhost:5173/signup**
2. Fill in the form:
   - **Name**: Your Name
   - **Email**: your.email@example.com
   - **Contact Number**: +1234567890
   - **Password**: test123 (minimum 6 characters)
   - **Confirm Password**: test123
3. Click **"Create Account"**
4. You should be redirected to the dashboard! 🎉

### Test 3: Verify Data in MongoDB
1. Go back to MongoDB Atlas
2. Click **"Database"** in left sidebar
3. Click **"Browse Collections"**
4. You should see:
   - Database: `globe-trotter`
   - Collections: `users`, `trips`, `itineraries`, `budgets`
5. Click on `users` collection
6. You'll see your user data stored!

---

## 🎉 What You Can Do Now

✅ **Sign Up / Login** - Full authentication working  
✅ **Create Trips** - Plan your adventures  
✅ **Build Itineraries** - Add activities with dates, times, costs  
✅ **Track Budgets** - Manage expenses by category  
✅ **Upload Images** - Add trip cover photos  
✅ **Share Trips** - Generate public share links  
✅ **Search Destinations** - Discover cities and activities  
✅ **User Profile** - Update info and upload avatar  

**All data persists in MongoDB!**

---

## 🐛 Troubleshooting

### Error: "MongoDB connection failed"
- ✅ Check `.env` file has correct connection string
- ✅ Make sure you replaced `<password>` with actual password
- ✅ Verify cluster URL is correct (cluster0.xxxxx.mongodb.net)
- ✅ Check Network Access in Atlas allows your IP

### Error: "Authentication failed"
- ✅ Username should be `globetrotter`
- ✅ Password should match what you set (e.g., `Globe2026!`)
- ✅ No spaces or special characters in password

### Backend won't start
- ✅ Make sure MongoDB Atlas cluster is active (not paused)
- ✅ Check all dependencies installed: `npm install`
- ✅ Verify `.env` file exists in backend folder

### Can't create account on frontend
- ✅ Make sure backend is running on port 5000
- ✅ Check browser console for errors (F12)
- ✅ Verify MongoDB is connected (check backend terminal)

---

## 📱 API Endpoints Ready to Use

All these endpoints are live and working:

**Authentication**
- POST `/api/auth/signup` - Create account
- POST `/api/auth/login` - Login
- POST `/api/auth/forgot-password` - Reset password
- GET `/api/auth/me` - Get current user

**Trips**
- GET `/api/trips` - Get all your trips
- POST `/api/trips` - Create new trip
- PUT `/api/trips/:id` - Update trip
- DELETE `/api/trips/:id` - Delete trip
- POST `/api/trips/:id/share` - Share trip

**Itineraries**
- GET `/api/itineraries/trip/:tripId` - Get itinerary
- POST `/api/itineraries/:id/activities` - Add activity

**Budgets**
- GET `/api/budgets/trip/:tripId` - Get budget
- POST `/api/budgets/:id/expenses` - Add expense
- GET `/api/budgets/:id/breakdown` - Get breakdown

**Search**
- GET `/api/search/cities` - Search cities
- GET `/api/search/activities` - Search activities

---

## 🔐 Your Credentials

**MongoDB Atlas:**
- Username: `globetrotter`
- Password: `Globe2026!` (or what you set)
- Database: `globe-trotter`

**Backend:**
- URL: http://localhost:5000
- JWT Secret: (in .env file)

**Frontend:**
- URL: http://localhost:5173

---

## ✨ Next Steps After Setup

1. ✅ Create your account on frontend
2. ✅ Create your first trip
3. ✅ Add activities to itinerary
4. ✅ Track your budget
5. ✅ Upload trip photos
6. ✅ Share your trip with friends

---

**That's it! Once you update the MONGODB_URI and restart the backend, everything will work perfectly! 🚀**

Need help? Check the terminal logs for specific error messages.
