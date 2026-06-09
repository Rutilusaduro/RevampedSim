import React from 'react'

const StudentCard = ({ student, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "18px 20px",
        maxWidth: "340px",
        cursor: "pointer",
        backgroundColor: "white",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "8px"
      }}>
        <h3 style={{ margin: 0 }}>{student.name}</h3>
        <span style={{ 
          backgroundColor: "#f1f3f5", 
          padding: "2px 8px", 
          borderRadius: "12px",
          fontSize: "0.85rem"
        }}>
          {student.lbs} lbs
        </span>
      </div>
      
      <p style={{ margin: 0, color: "#666" }}>
        Relationship: {student.relationship}
      </p>
    </div>
  )
}

export default StudentCard
