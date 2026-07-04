import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import History from './pages/History';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result/:tripId" element={<Result />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
