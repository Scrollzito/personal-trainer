import { useState } from 'react';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import machineData from '../../data/machines.json';
import './ExportPDFButton.css';

function ExportPDFButton() {
  const { currentPlan } = useWorkoutBuilder();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    if (currentPlan.exercises.length === 0) return;

    setIsGenerating(true);
    setError('');
    try {
      const { generateWorkoutPDF } = await import('../../utils/pdfGenerator');
      generateWorkoutPDF(currentPlan, machineData);
    } catch (error) {
      console.error('PDF generation failed:', error);
      setError('Unable to export this workout. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="export-pdf">
      <button
        type="button"
        className="export-pdf-button"
        onClick={handleExport}
        disabled={currentPlan.exercises.length === 0 || isGenerating}
        aria-busy={isGenerating}
      >
        {isGenerating ? '⏳ Generating...' : '📄 Export PDF'}
      </button>
      {error && <span className="export-pdf__error" role="alert">{error}</span>}
    </div>
  );
}

export default ExportPDFButton;
