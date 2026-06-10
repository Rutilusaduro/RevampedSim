import React, { useState } from 'react';

const DialogueModal = ({ dialogue, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const step = dialogue.steps[currentStep];

  const handleNext = () => {
    if (currentStep < dialogue.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSelectedChoice(true);
    }
  };

  const handleChoice = (choice) => {
    const result = {
      formId: dialogue.onComplete?.formId || "branded_glutton",
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
        backgroundColor: "#3d2a6e",
        maxWidth: "520px",
        width: "90%",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        color: "#e0d4ff",
        border: "2px solid #9b6dff"
      }}>
        <h2 style={{ marginTop: 0, color: "#c8a2ff" }}>{dialogue.title}</h2>

        {!selectedChoice ? (
          <>
            <div style={{ 
              backgroundColor: "#4a2c7a", 
              padding: "18px", 
              borderRadius: "8px", 
              margin: "20px 0",
              minHeight: "80px",
              lineHeight: "1.6"
            }}>
              <strong style={{ color: "#c8a2ff" }}>{step.speaker}:</strong> {step.text}
            </div>

            <button 
              onClick={handleNext} 
              style={{ 
                padding: "12px 24px", 
                backgroundColor: "#9b6dff", 
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            >
              {currentStep < dialogue.steps.length - 1 ? "Continue" : "What do you say?"}
            </button>
          </>
        ) : (
          <div>
            <h3 style={{ color: "#c8a2ff", marginBottom: "15px" }}>Choose a brand:</h3>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px", 
              marginTop: "10px" 
            }}>
              {dialogue.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  style={{ 
                    padding: "14px 20px", 
                    backgroundColor: "#9b6dff", 
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    textAlign: "left"
                  }}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onClose} 
          style={{ 
            marginTop: "25px", 
            color: "#c8a2ff", 
            background: "none", 
            border: "none",
            fontSize: "0.95rem"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogueModal;