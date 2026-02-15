import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MachineDetailPage from './pages/MachineDetailPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import MuscleGroupPage from './pages/MuscleGroupPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/machine/:id" element={<MachineDetailPage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/workout/:id" element={<WorkoutDetailPage />} />
          <Route path="/muscles/:group" element={<MuscleGroupPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
