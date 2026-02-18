import { useState } from 'react';
import { useWorkoutBuilder } from '../../context/WorkoutBuilderContext';
import { generateWorkoutPDF } from '../../utils/pdfGenerator';
import machineData from '../../data/machines.json';
import './ExportPDFButton.css';

function ExportPDFButton() {
  const { currentPlan } = useWorkoutBuilder();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    if (currentPlan.exercises.length === 0) return;

    setIsGenerating(true);
    try {
      generateWorkoutPDF(currentPlan, machineData);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}. Please check the console for details.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      className="export-pdf-button"
      onClick={handleExport}
      disabled={currentPlan.exercises.length === 0 || isGenerating}
    >
      {isGenerating ? '⏳ Generating...' : '📄 Export PDF'}
    </button>
  );
}

export default ExportPDFButton;
