import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export const generateWorkoutPDF = (plan, machinesData) => {
  try {
    const doc = new jsPDF();
  let yPosition = 20;

  // Header
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text(plan.name, 20, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Created: ${new Date(plan.dateCreated).toLocaleDateString()}`, 20, yPosition);
  yPosition += 5;
  doc.text(`Total Exercises: ${plan.exercises.length}`, 20, yPosition);
  yPosition += 15;

  // Exercise Summary Table
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Exercise Overview', 20, yPosition);
  yPosition += 8;

  const tableData = plan.exercises.map((ex, index) => {
    const machine = machinesData.machines.find(m => m.id === ex.machineId);
    return [
      index + 1,
      machine?.name || 'Unknown',
      ex.sets,
      ex.reps,
      `${ex.restSeconds}s`
    ];
  });

  autoTable(doc, {
    head: [['#', 'Exercise', 'Sets', 'Reps', 'Rest']],
    body: tableData,
    startY: yPosition,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 }
  });

  // Detailed Instructions (New Page)
  doc.addPage();
  yPosition = 20;

  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Detailed Exercise Instructions', 20, yPosition);
  yPosition += 10;

  plan.exercises.forEach((exercise, index) => {
    const machine = machinesData.machines.find(m => m.id === exercise.machineId);
    if (!machine) {
      console.warn(`[PDF] Machine not found for ID: ${exercise.machineId}`);
      return;
    }

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Exercise number and name
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(`${index + 1}. ${machine.name}`, 20, yPosition);
    yPosition += 7;

    // Sets/Reps/Rest
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`${exercise.sets} sets × ${exercise.reps} reps | Rest: ${exercise.restSeconds}s`, 20, yPosition);
    yPosition += 7;

    // Muscles worked
    doc.setFont(undefined, 'bold');
    doc.text('Muscles Worked:', 20, yPosition);
    yPosition += 5;
    doc.setFont(undefined, 'normal');
    const musclesText = machine.musclesWorked && machine.musclesWorked.length > 0
      ? machine.musclesWorked.slice(0, 3).join(', ')
      : 'No muscle data';
    doc.text(musclesText, 20, yPosition);
    yPosition += 7;

    // Instructions
    doc.setFont(undefined, 'bold');
    doc.text('Instructions:', 20, yPosition);
    yPosition += 5;
    doc.setFont(undefined, 'normal');

    if (machine.steps && Array.isArray(machine.steps) && machine.steps.length > 0) {
      machine.steps.forEach((step, stepIndex) => {
        const stepText = `${stepIndex + 1}. ${step.text}`;
        const lines = doc.splitTextToSize(stepText, 170);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * 5;
      });
    } else {
      doc.text('No instructions available.', 20, yPosition);
      yPosition += 5;
    }

    yPosition += 5;
  });

    // Save the PDF
    doc.save(`${plan.name.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('[PDF Generator] Error:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};
