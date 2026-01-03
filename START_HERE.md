# 🚀 Quick Start Guide - Run Everything

## ✅ Current Status
- Backend code: **Complete**
- Frontend code: **Complete**  
- MongoDB: **Installed** (needs to be started)
- Both servers: **Running** (need restart after MongoDB connection)

---

## 📋 Step-by-Step Instructions

### Step 1: Start MongoDB Service

**Option A: Using PowerShell Script (Recommended)**

1. Open PowerShell **as Administrator**:
   - Press `Windows + X`
   - Click "Terminal (Admin)" or "PowerShell (Admin)"

2. Navigate to backend folder:
   ```powershell
   cd "d:\Globe Trotter\Odoo-hackathon\backend"
   ```

3. Run the startup script:
   ```powershell
   .\start-mongodb.ps1
   ```

**Option B: Manual Command**

In Administrator PowerShell:
```powershell
net start MongoDB
```

You should see:
```
The MongoDB service was started successfully.
```

---

### Step 2: Update .env File (Already Done!)

Your `backend/.env` file should have:
```env
MONGODB_URI=mongodb://localhost:27017/globe-trotter
```

✅ This is already configured for you!

---

### Step 3: Restart Backend Server

1. Go to your **backend terminal** (currently running `npm run dev`)
2. Press **Ctrl + C** to stop the server
3. Run again:
   ```bash
   npm run dev
   ```

4. Look for this message:
   ```
   ✅ MongoDB Connected: localhost
   ```

If you see that, **you're connected!** 🎉

---

### Step 4: Verify Frontend is Running

Your frontend should already be running on http://localhost:5173

If not, in a new terminal:
```bash
cd "d:\Globe Trotter\Odoo-hackathon\frontend"
npm run dev
```

---

## 🧪 Test Everything

### Test 1: Backend Health Check
Open browser: **http://localhost:5000/api/health**

Should see:
```json
{
  "success": true,
  "message": "Globe Trotter API is running"
}
```

### Test 2: Create Your First Account

1. Go to: **http://localhost:5173/signup**
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Contact Number: +1234567890
   - Password: test123
   - Confirm Password: test123
3. Click **"Create Account"**
4. You should be redirected to the dashboard!

### Test 3: Verify Data in MongoDB

**Option A: Using MongoDB Compass (GUI)**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You'll see database: `globe-trotter`
4. Collections: `users`, `trips`, `itineraries`, `budgets`

**Option B: Using mongosh (CLI)**
```bash
mongosh
use globe-trotter
db.users.find()
```

---

## 🎯 What's Running

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5000 | ✅ Running |
| Frontend | http://localhost:5173 | ✅ Running |
| MongoDB | mongodb://localhost:27017 | ⚠️ Needs start |

---

## 🐛 Troubleshooting

### "Access is denied" when starting MongoDB
- You need to run PowerShell **as Administrator**
- Right-click PowerShell → "Run as Administrator"

### Backend shows "MongoDB connection failed"
- Make sure MongoDB service is running: `sc query MongoDB`
- Check `.env` has correct URI: `mongodb://localhost:27017/globe-trotter`
- Restart backend server after starting MongoDB

### Frontend can't connect to backend
- Backend must be running on port 5000
- Check backend terminal for errors
- Verify CORS is enabled (already configured)

### MongoDB service won't start
Try manual start:
```powershell
# Create data directory if it doesn't exist
mkdir C:\data\db -Force

# Start MongoDB manually
mongod --dbpath "C:\data\db"
```

---

## 📝 Summary

**To run everything:**

1. ✅ Start MongoDB (admin PowerShell): `net start MongoDB`
2. ✅ Restart backend: `Ctrl+C` then `npm run dev`
3. ✅ Frontend already running: http://localhost:5173
4. ✅ Test signup and create account!

**All your data will be stored in local MongoDB!** 🎉

---

## 🎊 You're All Set!

Once MongoDB is started and backend restarts:
- Create accounts
- Plan trips
- Build itineraries  
- Track budgets
- Upload photos
- Share trips

Everything works offline with local MongoDB!
