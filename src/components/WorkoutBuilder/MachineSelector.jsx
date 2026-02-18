import { useState } from 'react';
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
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(null);

  // Get available muscle groups for the selected category
  const availableMuscleGroups = activeCategory ? getMuscleGroupsForCategory(activeCategory) : [];

  // Handle category change and reset muscle group
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveMuscleGroup(null);
  };

  // Filter machines with three-tier filtering: category + muscle group + search
  const filteredMachines = machineData.machines.filter((machine) => {
    // Category filter
    const matchesCategory = !activeCategory || machine.category === activeCategory;

    // Muscle group filter (only applies when category is selected and muscle group is chosen)
    const matchesMuscleGroup = !activeCategory || !activeMuscleGroup ||
      machineMatchesMuscleGroup(machine, activeMuscleGroup, activeCategory);

    // Search filter
    const query = searchText.toLowerCase();
    const matchesSearch =
      !query ||
      machine.name.toLowerCase().includes(query) ||
      machine.shortDescription.toLowerCase().includes(query) ||
      machine.category.toLowerCase().includes(query);

    return matchesCategory && matchesMuscleGroup && matchesSearch;
  });

  const isAdded = (machineId) =>
    currentPlan.exercises.some(ex => ex.machineId === machineId);

  return (
    <div className="machine-selector">
      <h2 className="machine-selector__title">Add Exercises</h2>

      <SearchBar value={searchText} onChange={setSearchText} />
      <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />

      {activeCategory && availableMuscleGroups.length > 0 && (
        <MuscleGroupFilter
          muscleGroups={availableMuscleGroups}
          active={activeMuscleGroup}
          onChange={setActiveMuscleGroup}
        />
      )}

      <div className="machine-selector__list">
        {filteredMachines.map(machine => (
          <div key={machine.id} className="machine-selector__item">
            <MachineCard machine={machine} />
            <button
              className={`machine-selector__add-btn ${isAdded(machine.id) ? 'machine-selector__add-btn--added' : ''}`}
              onClick={() => addExercise(machine.id)}
              disabled={isAdded(machine.id)}
            >
              {isAdded(machine.id) ? '✓ Added' : '+ Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MachineSelector;
