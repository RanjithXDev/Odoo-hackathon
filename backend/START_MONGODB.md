# 🚀 Local MongoDB Setup Instructions

## MongoDB is Already Installed!

Good news - MongoDB is already installed on your system. Now we just need to start it and connect.

## Step 1: Start MongoDB Service (Requires Admin)

You need to run this command as **Administrator**:

1. **Open PowerShell as Administrator**:
   - Press `Windows + X`
   - Click "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Start MongoDB service**:
   ```powershell
   net start MongoDB
   ```

3. You should see:
   ```
   The MongoDB service is starting.
   The MongoDB service was started successfully.
   ```

## Step 2: Update Backend .env File

The `.env` file is already configured for local MongoDB!

Open `backend/.env` and make sure line 7 looks like this:

```env
MONGODB_URI=mongodb://localhost:27017/globe-trotter
```

**Your complete .env should be:**
```env
PORT=5000
NODE_ENV=development

# Local MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/globe-trotter

JWT_SECRET=globe-trotter-super-secret-key-change-in-production-2026
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@globetrotter.com

FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## Step 3: Restart Backend Server

1. Go to your backend terminal
2. Press **Ctrl + C** to stop
3. Run: `npm run dev`

You should see:
```
✅ MongoDB Connected: localhost
```

## Alternative: Start MongoDB Manually

If the service won't start, you can run MongoDB manually:

1. Open a new PowerShell window (as Administrator)
2. Run:
   ```powershell
   mongod --dbpath "C:\data\db"
   ```

If the folder doesn't exist, create it first:
```powershell
mkdir C:\data\db
mongod --dbpath "C:\data\db"
```

## Verify MongoDB is Running

Open a new terminal and run:
```powershell
mongosh
```

If you see the MongoDB shell, it's working! Type `exit` to quit.

## Test the Connection

1. Make sure MongoDB is running
2. Backend should show: `✅ MongoDB Connected: localhost`
3. Go to http://localhost:5173/signup
4. Create an account
5. Check data with MongoDB Compass or mongosh

---

**Once MongoDB service is started, everything will work!** 🎉
