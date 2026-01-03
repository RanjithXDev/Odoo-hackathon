# 🚀 Quick Setup Guide - Globe Trotter Backend + MongoDB

## Current Status
✅ Backend code is complete and ready  
✅ Frontend is running on http://localhost:5173  
✅ Backend is running on http://localhost:5000  
⚠️ **MongoDB connection needed**

---

## 🎯 Quick Start (5 Minutes)

### Option 1: MongoDB Atlas (Cloud - Recommended)

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose **FREE** tier (M0 Sandbox)

#### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Select **FREE** (M0) tier
3. Choose region closest to you
4. Click **"Create"** (takes 2-3 minutes)

#### Step 3: Create Database User
1. Security → Database Access → **"Add New Database User"**
2. Username: `globetrotter`
3. Password: `Globe2026!` (or your own)
4. Role: **"Read and write to any database"**
5. Click **"Add User"**

#### Step 4: Allow Network Access
1. Security → Network Access → **"Add IP Address"**
2. Click **"Allow Access from Anywhere"**
3. Confirm

#### Step 5: Get Connection String
1. Go to Database → **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://globetrotter:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with `Globe2026!`
5. Add database name at the end: `/globe-trotter`

**Final connection string should look like:**
```
mongodb+srv://globetrotter:Globe2026!@cluster0.xxxxx.mongodb.net/globe-trotter?retryWrites=true&w=majority
```

#### Step 6: Update .env File
Open `backend/.env` and update line 7:
```env
MONGODB_URI=mongodb+srv://globetrotter:Globe2026!@cluster0.xxxxx.mongodb.net/globe-trotter?retryWrites=true&w=majority
```

**Replace `cluster0.xxxxx.mongodb.net` with YOUR actual cluster URL!**

#### Step 7: Restart Backend
In the backend terminal, press `Ctrl+C` and run:
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## ✅ Verify Everything Works

### Test 1: Backend Health Check
Open browser: http://localhost:5000/api/health

Should see:
```json
{
  "success": true,
  "message": "Globe Trotter API is running"
}
```

### Test 2: Create Account
1. Go to frontend: http://localhost:5173
2. Click **"Sign up"**
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Contact Number: +1234567890
4. Click **"Sign Up"**

If successful, you'll be redirected to the dashboard!

### Test 3: Check MongoDB
1. Go to MongoDB Atlas → Database → Browse Collections
2. You should see:
   - Database: `globe-trotter`
   - Collections: `users`, `trips`, `itineraries`, `budgets`
   - Your user data in the `users` collection

---

## 🔧 Your Current .env Configuration

Your `backend/.env` file should have:

```env
PORT=5000
NODE_ENV=development

# UPDATE THIS LINE with your MongoDB Atlas connection string:
MONGODB_URI=mongodb+srv://globetrotter:Globe2026!@YOUR_CLUSTER.mongodb.net/globe-trotter?retryWrites=true&w=majority

JWT_SECRET=globe-trotter-super-secret-key-change-in-production-2026
JWT_EXPIRE=7d

# Email (optional for now - needed for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@globetrotter.com

FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

---

## 🎉 What You Can Do Now

Once MongoDB is connected:

✅ **Sign up / Login** - Create accounts and authenticate  
✅ **Create Trips** - Plan your travel adventures  
✅ **Build Itineraries** - Add activities and schedule  
✅ **Track Budget** - Manage expenses by category  
✅ **Upload Images** - Add trip cover photos  
✅ **Share Trips** - Generate public share links  
✅ **Search Cities** - Discover destinations  

All data will be stored in MongoDB Atlas!

---

## 🐛 Troubleshooting

### Backend won't start?
- Check if MongoDB URI is correct in `.env`
- Make sure you replaced `<password>` with actual password
- Verify cluster URL is correct

### Can't connect to MongoDB?
- Check Network Access in Atlas (allow 0.0.0.0/0)
- Verify database user credentials
- Make sure cluster is active (not paused)

### Frontend can't reach backend?
- Backend should be on http://localhost:5000
- Frontend should be on http://localhost:5173
- Check CORS is enabled (already configured)

---

## 📞 Need Help?

Check the logs in your terminal for error messages. Common issues:
- Wrong MongoDB URI format
- Incorrect password in connection string
- IP not whitelisted in Atlas
- MongoDB cluster not ready yet

---

**Once you update the MONGODB_URI in .env and restart the backend, everything will work! 🚀**
