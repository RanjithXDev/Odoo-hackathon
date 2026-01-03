# MongoDB Atlas Setup Guide

## Quick Start with MongoDB Atlas (Cloud Database - FREE)

Since MongoDB is not installed locally, I recommend using **MongoDB Atlas** - a free cloud database service.

### Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Choose the **FREE tier** (M0 Sandbox)

### Step 2: Create a Cluster

1. After signing in, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select a cloud provider and region (closest to you)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `globetrotter`
5. Set password: `globetrotter123` (or your own secure password)
6. Set role: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** (Clusters)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://globetrotter:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### Step 6: Update .env File

Open your `.env` file and update the `MONGODB_URI`:

```env
MONGODB_URI=mongodb+srv://globetrotter:globetrotter123@cluster0.xxxxx.mongodb.net/globe-trotter?retryWrites=true&w=majority
```

**Important**: Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL!

---

## Alternative: Install MongoDB Locally

If you prefer to install MongoDB locally:

### Windows Installation

1. Download MongoDB Community Server:
   [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. Run the installer (MSI file)
   - Choose "Complete" installation
   - Install MongoDB as a Service
   - Install MongoDB Compass (GUI tool)

3. After installation, MongoDB should start automatically

4. Update `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/globe-trotter
   ```

5. Start MongoDB service (if not running):
   ```powershell
   net start MongoDB
   ```

---

## Verify Connection

Once you've set up MongoDB (Atlas or local), test the connection:

1. Make sure `.env` file has the correct `MONGODB_URI`
2. Run the backend server:
   ```bash
   npm run dev
   ```
3. Look for this message:
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```

If you see this, your database is connected! 🎉

---

## Current .env Configuration Needed

Your `.env` file should have these values (update the MongoDB URI):

```env
PORT=5000
NODE_ENV=development

# Update this with your MongoDB Atlas connection string:
MONGODB_URI=mongodb+srv://globetrotter:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/globe-trotter?retryWrites=true&w=majority

JWT_SECRET=globe-trotter-super-secret-key-change-in-production-2026
JWT_EXPIRE=7d

# Email configuration (optional for now, needed for password reset)
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

## Next Steps

1. ✅ Set up MongoDB Atlas (or install locally)
2. ✅ Update `.env` with connection string
3. ✅ Install dependencies: `npm install`
4. ✅ Start server: `npm run dev`
5. ✅ Test API: `http://localhost:5000/api/health`
