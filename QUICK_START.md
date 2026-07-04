# ⚡ Quick Start Guide - CultureLens AI

## 🎯 Local Development Setup (5 minutes)

### 1️⃣ Install Dependencies
```bash
cd destination_discovery
npm run install:all
```

### 2️⃣ Setup Database (Neon PostgreSQL)
```
1. Go to https://neon.tech
2. Sign up (free)
3. Create new project: "culturelens-db"
4. Copy connection string
```

### 3️⃣ Get AI API Key

**Option A: OpenRouter (Free, Recommended)**
```
1. Visit: https://openrouter.ai
2. Sign up
3. Create API key
4. Copy key
```

**Option B: Google Gemini**
```
1. Visit: https://makersuite.google.com/app/apikey
2. Create API key
3. Copy key
```

### 4️⃣ Configure Environment

**Backend (.env)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
DATABASE_URL="postgresql://..." # From Neon
OPENROUTER_API_KEY="sk-..."    # Your API key
CLIENT_URL="http://localhost:5173"
PORT=3000
NODE_ENV=development
```

**Frontend (.env)**
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL="http://localhost:3000"
```

### 5️⃣ Initialize Database
```bash
cd ../server
npx prisma generate
npx prisma db push
```

### 6️⃣ Start Development Server
```bash
cd ..
npm run dev
```

**Done! 🎉**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 🚀 Production Deployment (15 minutes)

### Prerequisites
- GitHub account
- Code pushed to GitHub
- Neon database ready
- API key ready

### Deploy Backend (Render)

```
1. Go to https://render.com
2. New Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: server
   - Build Command: npm install && npx prisma generate
   - Start Command: npm start
5. Add Environment Variables:
   - DATABASE_URL
   - OPENROUTER_API_KEY
   - CLIENT_URL (add after frontend deploy)
   - NODE_ENV=production
   - PORT=3000
6. Deploy!
7. Copy Render URL
```

### Deploy Frontend (Vercel)

```
1. Go to https://vercel.com
2. New Project
3. Import GitHub repo
4. Auto-detects configuration
5. Add Environment Variable:
   - VITE_API_URL=(Your Render URL)
6. Deploy!
7. Copy Vercel URL
```

### Connect Them

```
1. Go back to Render
2. Update CLIENT_URL=(Your Vercel URL)
3. Save → Auto redeploy
4. Test your app!
```

---

## 📝 Development Checklist

### Before Starting
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Code editor ready (VS Code recommended)

### Setup Steps
- [ ] Dependencies installed (`npm run install:all`)
- [ ] Neon database created
- [ ] API key obtained
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Database initialized (`npx prisma db push`)
- [ ] Dev server running (`npm run dev`)

### Testing
- [ ] Frontend loads (http://localhost:5173)
- [ ] Backend health check works (http://localhost:3000/health)
- [ ] Can submit form
- [ ] Trip generates successfully
- [ ] All components render
- [ ] Map displays
- [ ] PDF export works
- [ ] History page works

---

## 🚀 Deployment Checklist

### Preparation
- [ ] Code pushed to GitHub
- [ ] Neon database ready
- [ ] API key ready
- [ ] Vercel account created
- [ ] Render account created

### Backend Deployment (Render)
- [ ] Web service created
- [ ] GitHub repo connected
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Health check works
- [ ] Backend URL copied

### Frontend Deployment (Vercel)
- [ ] Project imported
- [ ] Configuration detected
- [ ] Environment variable added (VITE_API_URL)
- [ ] Deployment successful
- [ ] Frontend URL copied

### Connection
- [ ] Backend CLIENT_URL updated with Vercel URL
- [ ] Backend redeployed
- [ ] Frontend VITE_API_URL points to Render
- [ ] Frontend redeployed

### Final Testing
- [ ] Live site loads
- [ ] Can submit form
- [ ] Trip generates successfully
- [ ] All features work
- [ ] Mobile responsive
- [ ] Share functionality works
- [ ] PDF export works
- [ ] History saves trips

---

## 🎯 Quick Commands Reference

### Root Directory
```bash
npm run install:all           # Install all dependencies
npm run dev                   # Run both frontend & backend
npm run build                 # Build frontend for production
npm run prisma:generate       # Generate Prisma client
npm run prisma:migrate        # Run database migrations
```

### Backend (server/)
```bash
npm run dev                   # Start dev server with nodemon
npm start                     # Start production server
npx prisma generate           # Generate Prisma client
npx prisma db push            # Push schema to database
npx prisma studio             # Open Prisma Studio (DB GUI)
```

### Frontend (client/)
```bash
npm run dev                   # Start Vite dev server
npm run build                 # Build for production
npm run preview               # Preview production build
```

---

## 🆘 Common Issues

### "Cannot connect to database"
```
✓ Check DATABASE_URL is correct
✓ Neon project is active
✓ Run: npx prisma db push
```

### "Failed to generate trip"
```
✓ Check API key is valid
✓ Backend server is running
✓ Check backend logs for errors
```

### "Module not found"
```
✓ Run: npm run install:all
✓ Delete node_modules and reinstall
```

### "Port already in use"
```
✓ Kill process: lsof -ti:3000 | xargs kill -9
✓ Or change PORT in .env
```

---

## 📚 Resources

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Detailed deployment steps
- [Neon Docs](https://neon.tech/docs) - Database documentation
- [Vercel Docs](https://vercel.com/docs) - Frontend deployment
- [Render Docs](https://render.com/docs) - Backend deployment

---

## 🎉 Success!

Your CultureLens AI is ready to discover authentic travel experiences! 🌍✨

**Need Help?**
- Check the logs
- Read error messages carefully
- Consult the full README
- Check GitHub issues

Happy coding and happy traveling! 🚀
