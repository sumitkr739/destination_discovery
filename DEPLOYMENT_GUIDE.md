# 🚀 Deployment Guide - CultureLens AI

Yeh guide tumhe step-by-step batayegi ki kaise easily Vercel aur Render pe deploy karo.

## 📋 Pre-Deployment Checklist

- [ ] GitHub repository ready hai
- [ ] Code push kar diya hai
- [ ] Neon PostgreSQL database setup ho gaya
- [ ] OpenRouter ya Gemini API key mil gaya
- [ ] Vercel account ban gaya
- [ ] Render account ban gaya

## 🗄️ Step 1: Database Setup (Neon PostgreSQL)

### 1.1 Neon Account Banao
```
1. https://neon.tech pe jao
2. "Sign Up" karo (GitHub se login kar sakte ho)
3. Free plan select karo
```

### 1.2 Database Create Karo
```
1. Dashboard pe "Create Project" click karo
2. Project name do: "culturelens-db"
3. Region select karo (nearest wala)
4. PostgreSQL version: 15 (default)
5. "Create Project" click karo
```

### 1.3 Connection String Copy Karo
```
1. Project dashboard me jao
2. "Connection Details" section me
3. "Connection string" copy karo
   Example: postgresql://user:pass@host.neon.tech/dbname?sslmode=require
4. Yeh string baad me use hogi
```

## 🔑 Step 2: API Keys Setup

### Option A: OpenRouter (Recommended)
```
1. https://openrouter.ai pe jao
2. Sign up karo
3. Dashboard → "Keys" section
4. "Create Key" click karo
5. Key copy karke safe rakho
```

### Option B: Google Gemini
```
1. https://makersuite.google.com/app/apikey pe jao
2. Google account se login karo
3. "Create API Key" click karo
4. Key copy karke safe rakho
```

## 🎨 Step 3: Frontend Deploy (Vercel)

### 3.1 Code Push Karo GitHub Pe
```bash
# Terminal me ye commands run karo
cd /Users/sumitkumarsinha/Desktop/destination_discovery
git init
git add .
git commit -m "CultureLens AI - Initial deployment"

# Apna GitHub repo URL yaha dalo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3.2 Vercel Pe Deploy Karo
```
1. https://vercel.com pe jao
2. "Sign Up" karo (GitHub se login recommended)
3. "New Project" click karo
4. Apna GitHub repo select karo
5. Import kar lo
```

### 3.3 Vercel Settings Configure Karo
```
Vercel automatically vercel.json detect kar lega, but check karo:

Build Settings:
✓ Build Command: cd client && npm install && npm run build
✓ Output Directory: client/dist
✓ Install Command: npm install --prefix client

Root Directory: Leave empty (/)
```

### 3.4 Environment Variable Add Karo (BAAD ME)
```
Abhi skip karo, backend deploy hone ke baad add karenge:
- VITE_API_URL: (Backend URL - baad me milega)
```

### 3.5 Deploy Karo
```
1. "Deploy" button click karo
2. Wait karo 2-3 minutes
3. Success! ✅
4. Vercel URL copy karo: https://your-app.vercel.app
```

## 🔧 Step 4: Backend Deploy (Render)

### 4.1 Render Account Banao
```
1. https://render.com pe jao
2. Sign up karo (GitHub se login recommended)
3. Dashboard pe jao
```

### 4.2 New Web Service Create Karo
```
1. "New +" button click karo
2. "Web Service" select karo
3. GitHub repo connect karo
4. Repository select karo
```

### 4.3 Service Configure Karo
```
Name: culturelens-api
Region: Oregon (ya nearest)
Branch: main
Root Directory: server
Runtime: Node

Build Command: npm install && npx prisma generate
Start Command: npm start

Instance Type: Free
```

### 4.4 Environment Variables Add Karo
```
"Environment" section me ye variables add karo:

Key: DATABASE_URL
Value: (Neon se copy kiya hua connection string)

Key: NODE_ENV
Value: production

Key: PORT
Value: 3000

Key: CLIENT_URL
Value: (Vercel URL jo Step 3 me mila - https://your-app.vercel.app)

Key: OPENROUTER_API_KEY
Value: (Apna OpenRouter key)

YA

Key: GEMINI_API_KEY
Value: (Apna Gemini key)
```

### 4.5 Deploy Karo
```
1. "Create Web Service" click karo
2. Wait karo 3-5 minutes (build + deploy)
3. Logs check karo - "🚀 Server running on port 3000" dikhna chahiye
4. Success! ✅
5. Render URL copy karo: https://culturelens-api.onrender.com
```

## 🔗 Step 5: Connect Frontend to Backend

### 5.1 Vercel Me Environment Variable Update Karo
```
1. Vercel dashboard pe jao
2. Apna project select karo
3. "Settings" tab
4. "Environment Variables" section
5. "Add" click karo

Key: VITE_API_URL
Value: (Render URL - https://culturelens-api.onrender.com)

6. "Save" karo
```

### 5.2 Redeploy Frontend
```
1. "Deployments" tab pe jao
2. Latest deployment pe "..." click karo
3. "Redeploy" select karo
4. Confirm karo
5. Wait karo 1-2 minutes
```

## 🔗 Step 6: Update Backend CORS

### 6.1 Render Environment Variables Update Karo
```
1. Render dashboard pe jao
2. "culturelens-api" service select karo
3. "Environment" tab
4. CLIENT_URL variable edit karo
5. Value update karo with actual Vercel URL
6. "Save Changes"
7. Auto-redeploy hoga
```

## ✅ Step 7: Testing

### 7.1 Backend Health Check
```
Browser me open karo:
https://your-render-url.onrender.com/health

Response expected:
{
  "status": "ok",
  "message": "CultureLens API is running"
}
```

### 7.2 Frontend Test
```
1. Vercel URL open karo: https://your-app.vercel.app
2. Form fill karo:
   - Destination: Tokyo
   - Budget: Mid-range
   - Duration: 5 days
   - Personality: Foodie
   - Interests: Sushi, Temples, Shopping
3. "Generate My Cultural Journey" click karo
4. Wait karo 20-30 seconds
5. Trip generate hona chahiye! 🎉
```

### 7.3 Full Feature Test
```
Test karo:
✓ Trip generation working hai
✓ Map display ho raha hai
✓ PDF export work kar raha hai
✓ History page me trip save ho raha hai
✓ Delete functionality working hai
✓ Share button working hai
✓ Mobile responsive hai
```

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to generate trip"
```
Solution:
1. Render logs check karo
2. Environment variables verify karo
3. API key valid hai check karo
4. Database connection test karo
```

### Issue 2: "Network Error" / CORS Error
```
Solution:
1. Render me CLIENT_URL verify karo
2. Exact Vercel URL use karo (trailing slash nahi chahiye)
3. Backend redeploy karo
```

### Issue 3: Database Error
```
Solution:
1. Neon dashboard check karo - project active hai?
2. DATABASE_URL correct hai?
3. Render logs me error dekhlo
4. Prisma generate command run hua?
```

### Issue 4: Map Not Showing
```
Solution:
1. Attractions me lat/lng values check karo
2. Browser console me errors dekhlo
3. Leaflet CSS load ho raha hai check karo
```

### Issue 5: Render Free Tier Sleep
```
Note: Free tier pe 15 minutes inactivity ke baad service sleep mode me chali jati hai.
First request slow hoga (20-30 seconds), fir fast ho jayega.

Solution: Paid plan upgrade karo ya accept kar lo initial delay.
```

## 🎯 Post-Deployment

### Update GitHub README
```
1. README.md me live URLs add karo:
   - Live Demo: https://your-app.vercel.app
   - API Endpoint: https://your-api.onrender.com

2. Screenshots add karo
3. Push karo GitHub pe
```

### Custom Domain (Optional)
```
Vercel:
1. Settings → Domains
2. Add custom domain
3. Configure DNS

Render:
1. Settings → Custom Domains
2. Add custom domain
3. Configure DNS
```

## 🔄 Update/Redeploy Process

### Code Update Karna Hai
```bash
# Changes karo
git add .
git commit -m "Update: feature description"
git push origin main

# Automatic:
- Vercel auto-deploy karega (2-3 min)
- Render auto-deploy karega (3-5 min)
```

### Manual Redeploy
```
Vercel:
Dashboard → Deployments → Redeploy

Render:
Dashboard → Manual Deploy → Deploy latest commit
```

## 📊 Monitoring

### Vercel Analytics
```
Dashboard → Analytics
- Page views
- Performance
- Errors
```

### Render Logs
```
Dashboard → Logs tab
- Real-time logs
- Error tracking
- Performance metrics
```

## 💰 Cost

### Free Tier Limits
```
Vercel:
✓ Unlimited deployments
✓ 100GB bandwidth/month
✓ Serverless functions

Render:
✓ 750 hours/month (enough for 1 service)
✓ Sleeps after 15 min inactivity
✓ 512 MB RAM

Neon:
✓ 0.5 GB storage
✓ Unlimited compute
```

## 🎉 Done!

Congratulations! Tumhara CultureLens AI successfully deploy ho gaya hai! 🚀

Live URLs:
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com

Ab demo do, share karo, aur enjoy karo! ✨

---

**Questions?** Check the main README.md ya GitHub issues me pucho.
