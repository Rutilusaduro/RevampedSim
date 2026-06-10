import React, { useState } from 'react';

const DialogueModal = ({ dialogue, onComplete, onClose }) => {
  const [currentNodeKey, setCurrentNodeKey] = useState(dialogue.start || 'start');

  const currentNode = dialogue.nodes?.[currentNodeKey] || dialogue.steps?.[0];

  const handleChoice = (choice) => {
    if (choice.next) {
      setCurrentNodeKey(choice.next);
    } else {
      // End of tree — complete the evolution
      onComplete({
        formId: dialogue.onComplete?.formId || "branded_glutton",
        brand: choice.brand,
        notification: choice.result || "She accepted the offer."
      });
    }
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
        color: "#e0d4ff",
        border: "2px solid #9b6dff"
      }}>
        <h2 style={{ marginTop: 0, color: "#c8a2ff" }}>{dialogue.title}</h2>

        <div style={{ 
          backgroundColor: "#4a2c7a", 
          padding: "18px", 
          borderRadius: "8px", 
          margin: "20px 0",
          minHeight: "80px",
          lineHeight: "1.6"
        }}>
          <strong style={{ color: "#c8a2ff" }}>{currentNode.speaker}:</strong> {currentNode.text}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
          {currentNode.choices?.map((choice, index) => (
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
    </div>
  );
};

export default DialogueModal;
