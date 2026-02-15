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
  { id: 'legs', name: 'Legs' },
  { id: 'chest', name: 'Chest' },
  { id: 'back', name: 'Back' },
  { id: 'shoulders', name: 'Shoulders' },
  { id: 'arms', name: 'Arms' },
  { id: 'core', name: 'Core' },
  { id: 'cardio', name: 'Cardio' },
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
      {/* Featured Workouts */}
      <section className="home-page__section">
        <div className="home-page__section-header">
          <h2 className="home-page__heading">Workout Routines</h2>
          <Link to="/workouts" className="home-page__see-all">See all</Link>
        </div>
        <p className="home-page__subtitle">
          Not sure where to start? Follow a pre-made workout plan.
        </p>
        <div className="home-page__workouts-grid">
          {featuredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>

      {/* Browse by Muscle Group */}
      <section className="home-page__section">
        <h2 className="home-page__heading">Browse by Muscle Group</h2>
        <div className="home-page__muscle-groups">
          {MUSCLE_GROUPS.map((group) => (
            <Link
              key={group.id}
              to={`/muscles/${group.id}`}
              className="home-page__muscle-link"
            >
              {group.name}
            </Link>
          ))}
        </div>
      </section>

      {/* All Machines */}
      <section className="home-page__section">
        <h2 className="home-page__heading">All Machines</h2>
        <p className="home-page__subtitle">
          Search or filter to find any machine in the gym.
        </p>
        <SearchBar value={searchText} onChange={setSearchText} />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <MachineList machines={filtered} />
      </section>
    </div>
  );
}

export default HomePage;
