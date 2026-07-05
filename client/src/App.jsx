import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Result = lazy(() => import('./pages/Result'));
const History = lazy(() => import('./pages/History'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (token) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  return children;
}

function App() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
          <span className="text-xs text-gray-400 font-mono tracking-widest animate-pulse">LOADING CULTURELENS...</span>
        </div>
      }>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/result/:tripId" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

