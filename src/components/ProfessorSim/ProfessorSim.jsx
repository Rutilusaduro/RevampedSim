import React, { useState } from 'react'
import StudentCard from './components/StudentCard'

const ProfessorSim = () => {
  const [students] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45, height: 66, archetype: "Cheerleader" },
    { id: 2, name: "Madeline", lbs: 118, relationship: 50, height: 64, archetype: "Bookworm" },
    { id: 3, name: "Kylie", lbs: 132, relationship: 55, height: 65, archetype: "Influencer" },
    { id: 4, name: "Serena", lbs: 155, relationship: 40, height: 68, archetype: "Athlete" },
    { id: 5, name: "Fiona", lbs: 125, relationship: 48, height: 63, archetype: "Artsy" },
    { id: 6, name: "Destiny", lbs: 140, relationship: 52, height: 67, archetype: "Gamer" },
    { id: 7, name: "Tiffany", lbs: 168, relationship: 60, height: 66, archetype: "Sorority" },
    { id: 8, name: "Priya", lbs: 122, relationship: 45, height: 62, archetype: "Overachiever" },
    { id: 9, name: "Maya", lbs: 128, relationship: 60, height: 65, archetype: "Quiet" },
    { id: 10, name: "Chloe", lbs: 135, relationship: 50, height: 64, archetype: "Transfer" },
    { id: 11, name: "Reneé", lbs: 150, relationship: 55, height: 66, archetype: "Culinary" },
    { id: 12, name: "Kaylee", lbs: 138, relationship: 40, height: 63, archetype: "Nursing" },
    { id: 13, name: "Nadia", lbs: 115, relationship: 48, height: 61, archetype: "Psych" },
    { id: 14, name: "Daisy", lbs: 158, relationship: 65, height: 67, archetype: "ECED" },
    { id: 15, name: "Mary Jane", lbs: 162, relationship: 55, height: 65, archetype: "Farm Girl" },
    { id: 16, name: "Lilith", lbs: 98, relationship: 35, height: 71, archetype: "Predator" },
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
    <div style={{ fontFamily: "system-ui", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
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

      <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* Class Roster View */}
        {showRoster && (
          <>
            <h1>Class Roster</h1>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
              gap: "16px", 
              marginTop: "20px" 
            }}>
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

        {/* Student Profile View */}
        {selectedStudent && (
          <div style={{ maxWidth: "700px" }}>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px" }}>
              ← Back to Roster
            </button>

            <h1>{selectedStudent.name} — {selectedStudent.archetype}</h1>

            {/* Info Box */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3>Information</h3>
              <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
              <p><strong>Height:</strong> {Math.floor(selectedStudent.height / 12)}'{selectedStudent.height % 12}"</p>
              <p><strong>BMI:</strong> {(selectedStudent.lbs / 2.205 / Math.pow(selectedStudent.height * 0.0254, 2)).toFixed(1)}</p>
            </div>

            {/* Physical Description Box */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3>Physical Description</h3>
              <p style={{ color: "#666" }}>
                [Physical description will go here later]
              </p>
            </div>

            {/* Diary Box */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3>Diary</h3>
              <p style={{ color: "#666" }}>
                [Diary entries will appear here]
              </p>
            </div>

            {/* Placeholder for Inner Thoughts */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3>Inner Thoughts <span style={{ fontSize: "0.8em", color: "#888" }}>(Locked)</span></h3>
              <p style={{ color: "#999" }}>
                This section will unlock when you gain the ability to hear her thoughts.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: "30px" }}>
              <h3>Actions</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button>Feed Her</button>
                <button>Talk</button>
                <button>Take to Dinner</button>
                <button>Observe</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessorSim
