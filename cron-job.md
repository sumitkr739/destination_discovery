# 🕐 Keep-Alive Cron Job Setup

## 📋 Overview

The application now includes an **automatic keep-alive service** that prevents Render (free tier) from sleeping after 15 minutes of inactivity.

## ✅ Built-in Keep-Alive Service

The backend automatically pings itself and the frontend every **14 minutes** when running in production mode.

### Features:
- ✅ Automatic backend health check
- ✅ Frontend accessibility check
- ✅ Structured logging with timestamps
- ✅ Error handling and recovery
- ✅ Only runs in production environment
- ✅ Graceful shutdown on server stop

### How It Works:

1. **Server starts** → Keep-alive service starts after 5 seconds
2. **Every 14 minutes** → Pings both frontend and backend
3. **Logs results** → Success/failure with timestamps
4. **Before 15min timeout** → Keeps services active

## 🚀 No Additional Setup Required!

The keep-alive service is **automatically enabled** when:
- `NODE_ENV=production` is set
- Backend is running on Render

## 📊 Monitoring

Check Render logs to see keep-alive activity:

```
⏰ Keep-alive service started
{"timestamp":"2024-07-04T...","level":"INFO","context":"KeepAlive","message":"Starting keep-alive ping..."}
{"timestamp":"2024-07-04T...","level":"INFO","context":"KeepAlive","message":"Backend ping successful","status":200}
{"timestamp":"2024-07-04T...","level":"INFO","context":"KeepAlive","message":"Frontend ping successful","status":200}
```

## 🔧 Environment Variables (Already Set)

```env
BACKEND_URL=https://destination-discovery.onrender.com
FRONTEND_URL=https://destination-discovery-t4sl.vercel.app
```

## 🎯 Benefits

✅ **No downtime** - Services stay active 24/7
✅ **Fast response** - No cold start delays
✅ **Better UX** - Users get instant responses
✅ **Free tier friendly** - Works with Render free tier
✅ **Auto-recovery** - Handles failures gracefully

## ⚙️ Configuration (Optional)

You can adjust the ping interval by modifying `PING_INTERVAL` in `server/src/utils/keepAlive.js`:

```javascript
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (default)
```

## 🛑 Disable Keep-Alive (If Needed)

Set `NODE_ENV=development` to disable the keep-alive service in Render environment variables.

---

**Status:** ✅ Active and Running
**Next Ping:** Automatically scheduled every 14 minutes
**Logs:** Check Render dashboard → Logs tab
