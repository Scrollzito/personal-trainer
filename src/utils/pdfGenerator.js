import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export const generateWorkoutPDF = (plan, machinesData) => {
  try {
    const doc = new jsPDF();
    let yPosition = 20;
    const ensureSpace = (height = 0) => {
      if (yPosition + height > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
      }
    };
    const writeWrappedText = (text) => {
      doc.splitTextToSize(text, 170).forEach((line) => {
        ensureSpace(5);
        doc.text(line, 20, yPosition);
        yPosition += 5;
      });
    };

    const planName = (plan.name.trim() || 'Untitled Workout').slice(0, 80);

    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    const titleLines = doc.splitTextToSize(planName, 170);
    doc.text(titleLines, 20, yPosition);
    yPosition += titleLines.length * 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Created: ${new Date(plan.dateCreated).toLocaleDateString()}`, 20, yPosition);
    yPosition += 5;
    doc.text(`Total Exercises: ${plan.exercises.length}`, 20, yPosition);
    yPosition += 15;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Exercise Overview', 20, yPosition);
    yPosition += 8;

    const tableData = plan.exercises.map((exercise, index) => {
      const machine = machinesData.machines.find((item) => item.id === exercise.machineId);
      return [
        index + 1,
        machine?.name || 'Unknown',
        exercise.sets,
        exercise.reps,
        `${exercise.restSeconds}s`
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

    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Detailed Exercise Instructions', 20, yPosition);
    yPosition += 10;

    plan.exercises.forEach((exercise, index) => {
      const machine = machinesData.machines.find((item) => item.id === exercise.machineId);
      if (!machine) {
        console.warn(`[PDF] Machine not found for ID: ${exercise.machineId}`);
        return;
      }
      const notes = typeof exercise.notes === 'string' ? exercise.notes.trim() : '';

      ensureSpace(31);
      doc.setFontSize(13);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${machine.name}`, 20, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`${exercise.sets} sets × ${exercise.reps} reps | Rest: ${exercise.restSeconds}s`, 20, yPosition);
      yPosition += 7;

      if (notes) {
        ensureSpace(10);
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 20, yPosition);
        yPosition += 5;
        doc.setFont(undefined, 'normal');
        writeWrappedText(notes);
        yPosition += 2;
      }

      ensureSpace(22);
      doc.setFont(undefined, 'bold');
      doc.text('Muscles Worked:', 20, yPosition);
      yPosition += 5;
      doc.setFont(undefined, 'normal');
      const musclesText = machine.musclesWorked?.length
        ? machine.musclesWorked.slice(0, 3).join(', ')
        : 'No muscle data';
      doc.text(musclesText, 20, yPosition);
      yPosition += 7;

      doc.setFont(undefined, 'bold');
      doc.text('Instructions:', 20, yPosition);
      yPosition += 5;
      doc.setFont(undefined, 'normal');

      if (Array.isArray(machine.steps) && machine.steps.length > 0) {
        machine.steps.forEach((step, stepIndex) => {
          writeWrappedText(`${stepIndex + 1}. ${step.text}`);
        });
      } else {
        ensureSpace(5);
        doc.text('No instructions available.', 20, yPosition);
        yPosition += 5;
      }

      yPosition += 5;
    });

    // Save the PDF
    const filename = planName.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_').slice(0, 80);
    doc.save(`${filename || 'Workout'}.pdf`);
  } catch (error) {
    console.error('[PDF Generator] Error:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};
