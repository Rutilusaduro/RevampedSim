import React, { useState } from 'react';

const DialogueModal = ({ dialogue, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const step = dialogue.steps[currentStep];

  const handleNext = () => {
    if (currentStep < dialogue.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show choices at the end
      setSelectedChoice(true);
    }
  };

  const handleChoice = (choice) => {
    const result = {
      ...dialogue.onComplete,
      brand: choice.brand,
      notification: choice.result
    };
    onComplete(result);
    onClose();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "#fff", maxWidth: "520px", width: "90%",
        borderRadius: "12px", padding: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ marginTop: 0, color: "#222" }}>{dialogue.title}</h2>

        {!selectedChoice ? (
          <>
            <div style={{ 
              backgroundColor: "#f8f9fa", 
              padding: "18px", 
              borderRadius: "8px", 
              margin: "20px 0",
              minHeight: "80px"
            }}>
              <strong>{step.speaker}:</strong> {step.text}
            </div>

            <button onClick={handleNext} style={{ padding: "12px 24px" }}>
              {currentStep < dialogue.steps.length - 1 ? "Continue" : "What do you say?"}
            </button>
          </>
        ) : (
          <div>
            <h3>Choose a brand:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
              {dialogue.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  style={{ 
                    padding: "14px", 
                    textAlign: "left",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "8px"
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: "20px", color: "#666" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogueModal;
