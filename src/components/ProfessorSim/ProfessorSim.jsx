import React, { useState } from 'react'
import StudentCard from './components/StudentCard'
import { baseDiaries } from '../../data/baseDiaries'
import { evolvedDiaries } from '../../data/evolvedDiaries'

const ProfessorSim = () => {
  const [students] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45, height: 66, archetype: "Cheerleader", formId: "eating_captain" },
    { id: 9, name: "Maya", lbs: 128, relationship: 60, height: 65, archetype: "Quiet", formId: "delivery_hive_queen" },
  ])

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRoster, setShowRoster] = useState(true)
  const [currentDiaryPage, setCurrentDiaryPage] = useState(0)

  // Simple pop-up states
  const [showFeedPopup, setShowFeedPopup] = useState(false)
  const [showObservePopup, setShowObservePopup] = useState(false)

  const handleCardClick = (student) => {
    setSelectedStudent(student)
    setShowRoster(false)
    setCurrentDiaryPage(0) // Reset diary page when switching students
  }

  const goBackToRoster = () => {
    setSelectedStudent(null)
    setShowRoster(true)
    setCurrentDiaryPage(0)
  }

  const getCurrentDiary = (student) => {
    if (student.formId && evolvedDiaries[student.formId]) {
      return evolvedDiaries[student.formId]
    }
    return baseDiaries[student.archetype.toLowerCase()] || []
  }

  const currentDiary = selectedStudent ? getCurrentDiary(selectedStudent) : []

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

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
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
          <div style={{ 
            backgroundColor: "#ffffff", 
            color: "#222", 
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px" }}>
              ← Back to Roster
            </button>

            <h1 style={{ color: "#222" }}>
              {selectedStudent.name} — {selectedStudent.archetype}
            </h1>

            {/* Information Box */}
            <div style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              color: "#222"
            }}>
              <h3>Information</h3>
              <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
              <p><strong>Height:</strong> {Math.floor(selectedStudent.height / 12)}'{selectedStudent.height % 12}"</p>
              <p><strong>BMI:</strong> {(selectedStudent.lbs / 2.205 / Math.pow(selectedStudent.height * 0.0254, 2)).toFixed(1)}</p>
            </div>

            {/* Physical Description Box */}
            <div style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              color: "#222"
            }}>
              <h3>Physical Description</h3>
              <p>[Physical description will go here later]</p>
            </div>

            {/* Diary Box with Page Flipping */}
            <div style={{
              backgroundColor: "#fffef5",
              border: "2px solid #d4c4a8",
              borderRadius: "8px",
              padding: "30px 40px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minHeight: "220px"
            }}>
              <h3 style={{ 
                marginTop: 0, 
                color: "#5c4636",
                borderBottom: "1px solid #d4c4a8",
                paddingBottom: "8px"
              }}>
                Diary
              </h3>

              <div style={{ 
                minHeight: "120px",
                color: "#3f2e1e",
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                lineHeight: "1.7"
              }}>
                {currentDiary.length > 0 ? (
                  <p style={{ margin: 0 }}>
                    {currentDiary[currentDiaryPage]?.text}
                  </p>
                ) : (
                  <p style={{ color: "#888", fontStyle: "italic" }}>
                    No diary entries unlocked yet.
                  </p>
                )}
              </div>

              {/* Page Navigation */}
              {currentDiary.length > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  borderTop: "1px solid #d4c4a8",
                  paddingTop: "12px"
                }}>
                  <button 
                    onClick={() => setCurrentDiaryPage(Math.max(0, currentDiaryPage - 1))}
                    disabled={currentDiaryPage === 0}
                  >
                    ← Previous Entry
                  </button>

                  <span style={{ color: "#8b6f47", fontSize: "0.9rem" }}>
                    Page {currentDiaryPage + 1} of {currentDiary.length}
                  </span>

                  <button 
                    onClick={() => setCurrentDiaryPage(Math.min(currentDiary.length - 1, currentDiaryPage + 1))}
                    disabled={currentDiaryPage === currentDiary.length - 1}
                  >
                    Next Entry →
                  </button>
                </div>
              )}
            </div>

            {/* Inner Thoughts (Locked) */}
            <div style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              color: "#222"
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
                <button onClick={() => setShowFeedPopup(true)}>Feed Her</button>
                <button>Talk</button>
                <button>Take to Dinner</button>
                <button onClick={() => setShowObservePopup(true)}>Observe</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feed Pop-up */}
      {showFeedPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "400px",
            textAlign: "center"
          }}>
            <h3>Feed {selectedStudent?.name}</h3>
            <p>[Placeholder text for feeding interaction]</p>
            <button onClick={() => setShowFeedPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Observe Pop-up */}
      {showObservePopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "400px",
            textAlign: "center"
          }}>
            <h3>Observe {selectedStudent?.name}</h3>
            <p>[Placeholder text for observation]</p>
            <button onClick={() => setShowObservePopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorSim