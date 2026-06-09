import React, { useState } from 'react'
import StudentCard from './components/StudentCard'

const ProfessorSim = () => {
  const [students] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45 },
    { id: 2, name: "Madeline", lbs: 118, relationship: 50 },
    { id: 3, name: "Kylie", lbs: 132, relationship: 55 },
    { id: 4, name: "Serena", lbs: 155, relationship: 40 },
    { id: 5, name: "Fiona", lbs: 125, relationship: 48 },
    { id: 6, name: "Destiny", lbs: 140, relationship: 52 },
    { id: 7, name: "Tiffany", lbs: 168, relationship: 60 },
    { id: 8, name: "Priya", lbs: 122, relationship: 45 },
    { id: 9, name: "Maya", lbs: 128, relationship: 60 },
    { id: 10, name: "Chloe", lbs: 135, relationship: 50 },
    { id: 11, name: "Reneé", lbs: 150, relationship: 55 },
    { id: 12, name: "Kaylee", lbs: 138, relationship: 40 },
    { id: 13, name: "Nadia", lbs: 115, relationship: 48 },
    { id: 14, name: "Daisy", lbs: 158, relationship: 65 },
    { id: 15, name: "Mary Jane", lbs: 162, relationship: 55 },
    { id: 16, name: "Lilith", lbs: 98, relationship: 35 },
  ])

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRoster, setShowRoster] = useState(true)

  const handleCardClick = (student) => {
    setSelectedStudent(student)
    setShowRoster(false)
  }

  const goBackToRoster = () => {
    setSelectedStudent(null)
    setShowRoster(true)
  }

  return (
    <div style={{ fontFamily: "system-ui" }}>
      {/* Menu Bar */}
      <div style={{
        backgroundColor: "#222",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        gap: "12px",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0, flex: 1 }}>Professor Sim</h2>
        <button onClick={goBackToRoster}>Class Roster</button>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {showRoster && (
          <>
            <h1>Class Roster</h1>
            <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
              {students.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onClick={() => handleCardClick(student)}
                />
              ))}
            </div>
          </>
        )}

        {selectedStudent && (
          <div>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px" }}>
              ← Back to Roster
            </button>
            <h1>{selectedStudent.name}'s Profile</h1>
            <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
            <p><strong>Relationship:</strong> {selectedStudent.relationship}</p>
            {/* We'll expand this profile page later */}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessorSim
