import { BrowserRouter, Navigate, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MachineDetailPage from './pages/MachineDetailPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import MuscleGroupPage from './pages/MuscleGroupPage';
import CreateWorkoutPage from './pages/CreateWorkoutPage';
import WorkoutSessionPage from './pages/WorkoutSessionPage';
import { WorkoutBuilderProvider } from './context/WorkoutBuilderContext';
import { ThemeProvider } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current !== pathname && navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
    previousPathname.current = pathname;
  }, [navigationType, pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <WorkoutBuilderProvider>
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
              <Route path="/create-workout" element={<CreateWorkoutPage />} />
              <Route path="/workout-session" element={<WorkoutSessionPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </BrowserRouter>
      </WorkoutBuilderProvider>
    </ThemeProvider>
  );
}

export default App;
