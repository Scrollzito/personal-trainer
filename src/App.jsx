import { BrowserRouter, Navigate, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import SafetyNotice from './components/SafetyNotice';
import HomePage from './pages/HomePage';
import MachineDetailPage from './pages/MachineDetailPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import MuscleGroupPage from './pages/MuscleGroupPage';
import CreateWorkoutPage from './pages/CreateWorkoutPage';
import WorkoutSessionPage from './pages/WorkoutSessionPage';
import SavedWorkoutsPage from './pages/SavedWorkoutsPage';
import { WorkoutBuilderProvider } from './context/WorkoutBuilderContext';
import { ThemeProvider } from './context/ThemeContext';

const routeTitles = {
  '/': 'Gym Machine Guide',
  '/workouts': 'Workout Routines | Gym Machine Guide',
  '/create-workout': 'Create Workout | Gym Machine Guide',
  '/saved-workouts': 'Saved Workouts | Gym Machine Guide'
};

function RouteEffects() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(null);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    const isInitialLoad = previousPathname.current === null;
    const heading = document.querySelector('#main-content h1, #main-content h2');
    const headingText = heading?.textContent.trim().replace(/\s+/g, ' ');

    document.title = routeTitles[pathname]
      ?? `${headingText || 'Gym Machine Guide'} | Gym Machine Guide`;

    if (!isInitialLoad && navigationType !== 'POP') {
      window.scrollTo(0, 0);
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
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
          <RouteEffects />
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <Header />
          <main className="main-content" id="main-content" tabIndex="-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/machine/:id" element={<MachineDetailPage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/workout/:id" element={<WorkoutDetailPage />} />
              <Route path="/muscles/:group" element={<MuscleGroupPage />} />
              <Route path="/create-workout" element={<CreateWorkoutPage />} />
              <Route path="/saved-workouts" element={<SavedWorkoutsPage />} />
              <Route path="/workout-session" element={<WorkoutSessionPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <SafetyNotice />
          </main>
        </BrowserRouter>
      </WorkoutBuilderProvider>
    </ThemeProvider>
  );
}

export default App;
