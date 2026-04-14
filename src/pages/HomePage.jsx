import { useState } from 'react';
import { Link } from 'react-router-dom';
import machineData from '../data/machines.json';
import workoutData from '../data/workouts.json';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import MachineList from '../components/MachineList';
import WorkoutCard from '../components/WorkoutCard';
import './HomePage.css';

const MUSCLE_GROUPS = [
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'chest', name: 'Chest', icon: '💪' },
  { id: 'back', name: 'Back', icon: '🏋️' },
  { id: 'shoulders', name: 'Shoulders', icon: '🔝' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'core', name: 'Core', icon: '⚡' },
  { id: 'cardio', name: 'Cardio', icon: '🏃' },
];

function HomePage() {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = machineData.machines.filter((machine) => {
    const matchesCategory = !activeCategory || machine.category === activeCategory;
    const query = searchText.toLowerCase();
    const matchesSearch =
      !query ||
      machine.name.toLowerCase().includes(query) ||
      machine.shortDescription.toLowerCase().includes(query) ||
      machine.category.toLowerCase().includes(query) ||
      machine.musclesWorked.some((m) => m.toLowerCase().includes(query)) ||
      machine.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const featuredWorkouts = workoutData.workouts.slice(0, 3);

  return (
    <div className="home-page">

      {/* Hero */}
      <section className="home-page__hero">
        <div className="home-page__hero-text">
          <h1 className="home-page__hero-title">
            Your Gym,<br /><span>Mastered.</span>
          </h1>
          <p className="home-page__hero-subtitle">
            Step-by-step guides for every machine. Build custom workouts. Train smarter every session.
          </p>
        </div>
        <div className="home-page__stats">
          <div className="home-page__stat">
            <span className="home-page__stat-number">{machineData.machines.length}</span>
            <span className="home-page__stat-label">Machines</span>
          </div>
          <div className="home-page__stat-divider" />
          <div className="home-page__stat">
            <span className="home-page__stat-number">7</span>
            <span className="home-page__stat-label">Categories</span>
          </div>
          <div className="home-page__stat-divider" />
          <div className="home-page__stat">
            <span className="home-page__stat-number">{workoutData.workouts.length}</span>
            <span className="home-page__stat-label">Workouts</span>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="home-page__section">
        <div className="home-page__section-header">
          <div>
            <h2 className="home-page__heading">Workout Routines</h2>
            <p className="home-page__subtitle">Follow a pre-made plan to get started.</p>
          </div>
          <Link to="/workouts" className="home-page__see-all">See all</Link>
        </div>
        <div className="home-page__workouts-grid">
          {featuredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>

      {/* Browse by Muscle Group */}
      <section className="home-page__section">
        <h2 className="home-page__heading">Browse by Muscle Group</h2>
        <p className="home-page__subtitle">Jump straight to the muscles you want to train.</p>
        <div className="home-page__muscle-groups">
          {MUSCLE_GROUPS.map((group) => (
            <Link key={group.id} to={`/muscles/${group.id}`} className="home-page__muscle-link">
              <span className="home-page__muscle-name">{group.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Machines */}
      <section className="home-page__section">
        <div className="home-page__section-header">
          <div>
            <h2 className="home-page__heading">All Machines</h2>
            <p className="home-page__subtitle">Search or filter to find any machine in the gym.</p>
          </div>
        </div>
        <SearchBar value={searchText} onChange={setSearchText} />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <MachineList machines={filtered} />
      </section>
    </div>
  );
}

export default HomePage;
