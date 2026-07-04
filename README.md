# 🌍 CultureLens AI - Discover Places Like a Local

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

An AI-powered travel platform that helps travelers discover destinations through authentic local culture, storytelling, food, festivals, heritage, and hidden gems. Built for the **Google PromptWars: Destination Discovery & Cultural Experiences** challenge.

## ✨ Features

### 🎯 Core Features
- **Immersive Destination Stories** - AI-generated narratives about local culture
- **Hidden Gems Discovery** - Authentic places loved by locals
- **Local Food Passport** - Signature dishes, street food, drinks & desserts
- **Cultural Etiquette Guide** - Do's and don'ts for respectful travel
- **Festival Calendar** - Local events and cultural celebrations
- **Smart Packing List** - Personalized checklist for your trip
- **Essential Phrases** - Learn key local language phrases
- **Interactive Maps** - OpenStreetMap integration with attraction markers
- **Day-by-Day Itinerary** - Detailed timeline with activities and tips
- **Souvenir Recommendations** - Authentic local crafts to bring home

### 💡 Technical Features
- **Save Trip History** - All trips saved in PostgreSQL database
- **PDF Export** - Download complete itinerary as PDF
- **Share Trips** - Share your journey with friends
- **Responsive Design** - Works beautifully on all devices
- **Smooth Animations** - Framer Motion powered interactions
- **Glassmorphism UI** - Modern, premium design aesthetic
- **Loading Skeletons** - Elegant loading states
- **Error Handling** - Robust validation and error management

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Leaflet** - Interactive maps
- **Lucide React** - Beautiful icons
- **jsPDF** - PDF generation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database (Neon)
- **OpenRouter / Gemini** - AI models
- **Helmet** - Security middleware
- **Compression** - Response compression
- **Rate Limiting** - API protection

## 📁 Project Structure

```
culturelens-ai/
│
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── StoryCard.jsx
│   │   │   ├── HiddenGemsCard.jsx
│   │   │   ├── FoodPassport.jsx
│   │   │   ├── CulturalEtiquette.jsx
│   │   │   ├── FestivalsCard.jsx
│   │   │   ├── SouvenirsCard.jsx
│   │   │   ├── LanguageCard.jsx
│   │   │   ├── PackingCard.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── Map.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   │
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.jsx             # Landing & form page
│   │   │   ├── Result.jsx           # Trip results display
│   │   │   └── History.jsx          # Saved trips list
│   │   │
│   │   ├── services/                # API services
│   │   │   └── api.js               # Axios API client
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── cn.js                # Tailwind class merge
│   │   │   └── pdfExport.js         # PDF generation
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── public/                      # Static assets
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── package.json                 # Frontend dependencies
│   └── .env.example                 # Environment variables template
│
├── server/                          # Backend application
│   ├── src/
│   │   ├── controllers/             # Route controllers
│   │   │   └── tripController.js    # Trip CRUD operations
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   └── tripRoutes.js        # Trip endpoints
│   │   │
│   │   ├── services/                # Business logic
│   │   │   ├── aiService.js         # AI integration
│   │   │   └── prismaService.js     # Database client
│   │   │
│   │   ├── app.js                   # Express app setup
│   │   └── server.js                # Server entry point
│   │
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   │
│   ├── package.json                 # Backend dependencies
│   └── .env.example                 # Environment variables template
│
├── vercel.json                      # Vercel deployment config
├── render.yaml                      # Render deployment config
├── package.json                     # Root package.json
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- OpenRouter API key OR Gemini API key

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd destination_discovery
```

### 2. Install Dependencies
```bash
npm run install:all
```

This installs dependencies for root, client, and server.

### 3. Setup Environment Variables

#### Backend (.env in server folder)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
# Database (Get from Neon.tech)
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# AI API - Choose ONE
OPENROUTER_API_KEY="your_openrouter_key_here"
# OR
GEMINI_API_KEY="your_gemini_key_here"

# Server
PORT=3000
NODE_ENV=development

# Frontend URL
CLIENT_URL="http://localhost:5173"
```

#### Frontend (.env in client folder)
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL="http://localhost:3000"
```

### 4. Setup Database
```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
# From root directory
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🔑 Getting API Keys

### Option 1: OpenRouter (Recommended - Free Tier Available)
1. Visit https://openrouter.ai
2. Sign up for an account
3. Go to Keys section
4. Create a new API key
5. Add to `server/.env` as `OPENROUTER_API_KEY`

### Option 2: Google Gemini
1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `server/.env` as `GEMINI_API_KEY`

### Option 3: Demo Mode
If no API key is provided, the app will use demo content for testing.

## 🗄️ Database Setup (Neon PostgreSQL)

1. Go to https://neon.tech
2. Sign up for a free account
3. Create a new project
4. Copy the connection string
5. Add to `server/.env` as `DATABASE_URL`

The free tier includes:
- 0.5 GB storage
- Unlimited compute hours
- Perfect for this project!

## 📦 Deployment

### Deploy Frontend to Vercel

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`
   - Add environment variable:
     - `VITE_API_URL`: Your Render backend URL (after backend deployment)
   - Click "Deploy"

3. **After deployment**, copy your Vercel URL (e.g., `https://your-app.vercel.app`)

### Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit https://render.com
   - Click "New +" → "Blueprint"

2. **Connect Repository**
   - Connect your GitHub repository
   - Render will detect `render.yaml`

3. **Configure Environment Variables**
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `CLIENT_URL`: Your Vercel frontend URL
   - `OPENROUTER_API_KEY` or `GEMINI_API_KEY`: Your AI API key
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Apply" to deploy
   - Wait for deployment to complete
   - Copy your Render backend URL

5. **Update Frontend**
   - Go back to Vercel
   - Update `VITE_API_URL` environment variable with your Render URL
   - Redeploy frontend

## 🧪 Testing

### Test Backend
```bash
cd server
npm run dev

# Test health endpoint
curl http://localhost:3000/health
```

### Test Frontend
```bash
cd client
npm run dev
```

Visit http://localhost:5173 and test the application.

### Test Trip Generation
1. Fill in all form fields
2. Click "Generate My Cultural Journey"
3. Wait 20-30 seconds for AI generation
4. View your personalized itinerary
5. Test PDF export and sharing features

## 🎨 Design Philosophy

- **Glassmorphism**: Modern, premium aesthetic with frosted glass effects
- **Gradient Backgrounds**: Vibrant, animated color transitions
- **Smooth Animations**: Framer Motion powered interactions
- **Cultural Focus**: Storytelling over typical tourist recommendations
- **Responsive**: Mobile-first, works on all screen sizes
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation
- SQL injection protection (Prisma)
- XSS protection

## ⚡ Performance Optimizations

- Code splitting with Vite
- Lazy loading of map components
- Image optimization
- Response compression
- Database indexing
- Efficient Prisma queries

## 🐛 Troubleshooting

### "Failed to generate trip"
- Check that your AI API key is valid
- Ensure backend server is running
- Check browser console for errors
- Verify DATABASE_URL is correct

### Map not showing
- Check that attractions have valid coordinates (lat/lng)
- Verify leaflet CSS is loaded
- Open browser console for errors

### PDF export not working
- Ensure jsPDF is installed
- Check browser console for errors
- Try on a different browser

### Database connection failed
- Verify DATABASE_URL format
- Check Neon project is active
- Run `npx prisma db push` again

## 🤝 Contributing

This project was built for the Google PromptWars challenge. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use this project for learning and building!

## 🎯 Challenge Submission

**Google PromptWars: Destination Discovery & Cultural Experiences**

This application demonstrates:
- ✅ AI-powered destination discovery
- ✅ Cultural immersion and storytelling
- ✅ Local experiences over tourist traps
- ✅ Authentic food recommendations
- ✅ Cultural etiquette and respect
- ✅ Festival and event discovery
- ✅ Interactive maps and itineraries
- ✅ Production-ready deployment
- ✅ Beautiful, modern UI/UX

## 👨‍💻 Developer

Built with ❤️ for authentic travel experiences

## 🌟 Acknowledgments

- Google PromptWars for the challenge
- OpenRouter for AI API access
- Neon for PostgreSQL hosting
- Vercel for frontend hosting
- Render for backend hosting
- OpenStreetMap for map tiles

---

**Happy Traveling! 🌍✈️**
