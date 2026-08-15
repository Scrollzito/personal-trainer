import { useSearchParams } from 'react-router-dom';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import machineData from '../../data/machines.json';
import SearchBar from '../SearchBar';
import CategoryFilter from '../CategoryFilter';
import MuscleGroupFilter from '../MuscleGroupFilter';
import MachineCard from '../MachineCard';
import { getMuscleGroupsForCategory, machineMatchesMuscleGroup } from '../../utils/muscleGroups';
import './MachineSelector.css';

function MachineSelector() {
  const { currentPlan, addExercise } = useWorkoutBuilder();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const activeCategory = machineData.machines.some((machine) => machine.category === category)
    ? category
    : null;

  // Get available muscle groups for the selected category
  const availableMuscleGroups = activeCategory ? getMuscleGroupsForCategory(activeCategory) : [];
  const muscleGroup = searchParams.get('muscle');
  const activeMuscleGroup = availableMuscleGroups.includes(muscleGroup) ? muscleGroup : null;

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  // Handle category change and reset muscle group
  const handleCategoryChange = (category) => {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', category);
    else next.delete('category');
    next.delete('muscle');
    setSearchParams(next, { replace: true });
  };

  // Filter machines with three-tier filtering: category + muscle group + search
  const filteredMachines = machineData.machines.filter((machine) => {
    // Category filter
    const matchesCategory = !activeCategory || machine.category === activeCategory;

    // Muscle group filter (only applies when category is selected and muscle group is chosen)
    const matchesMuscleGroup = !activeCategory || !activeMuscleGroup ||
      machineMatchesMuscleGroup(machine, activeMuscleGroup, activeCategory);

    // Search filter
    const query = searchText.trim().toLowerCase();
    const matchesSearch =
      !query ||
      machine.name.toLowerCase().includes(query) ||
      machine.shortDescription.toLowerCase().includes(query) ||
      machine.category.toLowerCase().includes(query) ||
      machine.musclesWorked.some((muscle) => muscle.toLowerCase().includes(query)) ||
      machine.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesMuscleGroup && matchesSearch;
  });

  const isAdded = (machineId) =>
    currentPlan.exercises.some(ex => ex.machineId === machineId);

  return (
    <div className="machine-selector">
      <h2 className="machine-selector__title">Add Exercises</h2>

      <SearchBar value={searchText} onChange={(value) => setFilter('q', value)} />
      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      {activeCategory && availableMuscleGroups.length > 0 && (
        <MuscleGroupFilter
          muscleGroups={availableMuscleGroups}
          active={activeMuscleGroup}
          onChange={(value) => setFilter('muscle', value)}
        />
      )}

      {filteredMachines.length === 0 ? (
        <div className="machine-selector__empty" role="status">
          <strong>No machines found</strong>
          <span>Try another search or clear the filters.</span>
        </div>
      ) : (
        <div className="machine-selector__list">
          {filteredMachines.map(machine => (
          <div key={machine.id} className="machine-selector__item">
            <MachineCard machine={machine} />
            <button
              type="button"
              aria-label={`${isAdded(machine.id) ? 'Added' : 'Add'} ${machine.name}`}
              className={`machine-selector__add-btn ${isAdded(machine.id) ? 'machine-selector__add-btn--added' : ''}`}
              onClick={() => addExercise(machine.id)}
              disabled={isAdded(machine.id)}
            >
              {isAdded(machine.id) ? '✓ Added' : '+ Add'}
            </button>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MachineSelector;
