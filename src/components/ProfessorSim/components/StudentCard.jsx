import React from 'react'

const StudentCard = ({ student, onFeed }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      maxWidth: "320px"
    }}>
      <h3>{student.name}</h3>
      <p><strong>Weight:</strong> {student.lbs} lbs</p>
      <p><strong>Relationship:</strong> {student.relationship}</p>

      <button onClick={onFeed} style={{ marginTop: "12px" }}>
        Feed (+8 lbs)
      </button>
    </div>
  )
}

export default StudentCard
