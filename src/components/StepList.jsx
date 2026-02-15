import './StepList.css';

function StepList({ steps }) {
  return (
    <ol className="step-list">
      {steps.map((step) => (
        <li key={step.number} className="step-list__item">
          <div className="step-list__number">{step.number}</div>
          <div className="step-list__content">
            <p className="step-list__text">{step.text}</p>
            {step.tip && (
              <div className="step-list__tip">
                <strong>Tip:</strong> {step.tip}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default StepList;
