import React, { useState } from 'react'
import StudentCard from './components/StudentCard'
import { baseDiaries } from '../../data/baseDiaries'
import { evolvedDiaries } from '../../data/evolvedDiaries'
import { studentContent } from '../../data/studentContent'

const ProfessorSim = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45, height: 66, archetype: "Cheerleader", formId: null },
    { id: 2, name: "Madeline", lbs: 118, relationship: 50, height: 64, archetype: "Bookworm", formId: null },
    { id: 3, name: "Kylie", lbs: 132, relationship: 55, height: 65, archetype: "Influencer", formId: null },
    { id: 4, name: "Serena", lbs: 155, relationship: 40, height: 68, archetype: "Athlete", formId: null },
    { id: 5, name: "Fiona", lbs: 125, relationship: 48, height: 63, archetype: "Artsy", formId: null },
    { id: 6, name: "Destiny", lbs: 140, relationship: 52, height: 67, archetype: "Gamer", formId: null },
    { id: 7, name: "Tiffany", lbs: 168, relationship: 60, height: 66, archetype: "Sorority", formId: null },
    { id: 8, name: "Priya", lbs: 122, relationship: 45, height: 62, archetype: "Overachiever", formId: null },
    { id: 9, name: "Maya", lbs: 128, relationship: 60, height: 65, archetype: "Quiet", formId: null },
    { id: 10, name: "Chloe", lbs: 135, relationship: 50, height: 64, archetype: "Transfer", formId: null },
    { id: 11, name: "Reneé", lbs: 150, relationship: 55, height: 66, archetype: "Culinary", formId: null },
    { id: 12, name: "Kaylee", lbs: 138, relationship: 40, height: 63, archetype: "Nursing", formId: null },
    { id: 13, name: "Nadia", lbs: 115, relationship: 48, height: 61, archetype: "Psych", formId: null },
    { id: 14, name: "Daisy", lbs: 158, relationship: 65, height: 67, archetype: "ECED", formId: null },
    { id: 15, name: "Mary Jane", lbs: 162, relationship: 55, height: 65, archetype: "Farm Girl", formId: null },
    { id: 16, name: "Lilith", lbs: 98, relationship: 35, height: 71, archetype: "Predator", formId: null },
  ])

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRoster, setShowRoster] = useState(true)
  const [currentDiaryPage, setCurrentDiaryPage] = useState(0)

  // Pop-up states
  const [showFeedPopup, setShowFeedPopup] = useState(false)
  const [showObservePopup, setShowObservePopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")

  const HEAVY_THRESHOLD = 238

  const handleCardClick = (student) => {
    setSelectedStudent(student)
    setShowRoster(false)
    setCurrentDiaryPage(0)
  }

  const goBackToRoster = () => {
    setSelectedStudent(null)
    setShowRoster(true)
    setCurrentDiaryPage(0)
  }

  // Get diary (base or evolved)
  const getCurrentDiary = (student) => {
    if (student.formId && evolvedDiaries[student.formId]) {
      return evolvedDiaries[student.formId]
    }
    return baseDiaries[student.archetype.toLowerCase()] || []
  }

  const currentDiary = selectedStudent ? getCurrentDiary(selectedStudent) : []

  // Dynamic content getter
  const getDynamicText = (student, type) => {
    if (!studentContent[student.id]) return "[Content not available yet]"

    const contentSet = student.formId 
      ? studentContent[student.id].evolved 
      : studentContent[student.id].base

    if (!contentSet || !contentSet[type]) return "[Content not available yet]"

    const entries = contentSet[type]
    let bestEntry = entries[0]

    for (let entry of entries) {
      if (student.lbs >= entry.minLbs) {
        bestEntry = entry
      }
    }
    return bestEntry.text
  }

  // Try to feed a student
  const tryFeedStudent = (id) => {
    const studentIndex = students.findIndex(s => s.id === id)
    if (studentIndex === -1) return

    const student = students[studentIndex]

    // Block feeding if not evolved and at/above Heavy
    if (!student.formId && student.lbs >= HEAVY_THRESHOLD) {
      setPopupMessage("She's too lost in thought to eat more right now...")
      setShowFeedPopup(true)
      return
    }

    // Feed the student
    const newStudents = [...students]
    newStudents[studentIndex] = {
      ...student,
      lbs: student.lbs + 8
    }
    setStudents(newStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(newStudents[studentIndex])
    }
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

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Class Roster */}
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

        {/* Profile View */}
        {selectedStudent && (
          <div style={{ backgroundColor: "#ffffff", color: "#222", padding: "20px", borderRadius: "8px" }}>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px" }}>
              ← Back to Roster
            </button>

            <h1>{selectedStudent.name} — {selectedStudent.archetype}</h1>

            {/* Information */}
            <div style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3>Information</h3>
              <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
              <p><strong>Height:</strong> {Math.floor(selectedStudent.height / 12)}'{selectedStudent.height % 12}"</p>
              <p><strong>BMI:</strong> {(selectedStudent.lbs / 2.205 / Math.pow(selectedStudent.height * 0.0254, 2)).toFixed(1)}</p>
            </div>

            {/* Physical Description */}
            <div style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3>Physical Description</h3>
              <p>{getDynamicText(selectedStudent, 'physicalDescription')}</p>
            </div>

            {/* Diary with Page Flipping */}
            <div style={{
              backgroundColor: "#fffef5",
              border: "2px solid #d4c4a8",
              borderRadius: "8px",
              padding: "30px 40px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minHeight: "220px"
            }}>
              <h3 style={{ color: "#5c4636", borderBottom: "1px solid #d4c4a8", paddingBottom: "8px" }}>
                Diary
              </h3>

              <div style={{ minHeight: "120px", color: "#3f2e1e", fontFamily: "Georgia, serif", fontSize: "1.05rem", lineHeight: "1.7" }}>
                {currentDiary.length > 0 ? (
                  <p style={{ margin: 0 }}>{currentDiary[currentDiaryPage]?.text}</p>
                ) : (
                  <p style={{ color: "#888", fontStyle: "italic" }}>No diary entries unlocked yet.</p>
                )}
              </div>

              {currentDiary.length > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", borderTop: "1px solid #d4c4a8", paddingTop: "12px" }}>
                  <button onClick={() => setCurrentDiaryPage(Math.max(0, currentDiaryPage - 1))} disabled={currentDiaryPage === 0}>
                    ← Previous
                  </button>
                  <span style={{ color: "#8b6f47" }}>
                    Page {currentDiaryPage + 1} of {currentDiary.length}
                  </span>
                  <button onClick={() => setCurrentDiaryPage(Math.min(currentDiary.length - 1, currentDiaryPage + 1))} disabled={currentDiaryPage === currentDiary.length - 1}>
                    Next →
                  </button>
                </div>
              )}
            </div>

            {/* Inner Thoughts */}
            <div style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3>Inner Thoughts</h3>
              <p>{getDynamicText(selectedStudent, 'innerThoughts')}</p>
            </div>

            {/* Actions */}
            <div style={{ marginTop: "30px" }}>
              <h3>Actions</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={() => tryFeedStudent(selectedStudent.id)}>Feed Her</button>
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
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", maxWidth: "400px", textAlign: "center" }}>
            <h3>Feed {selectedStudent?.name}</h3>
            <p>{popupMessage}</p>
            <button onClick={() => setShowFeedPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Observe Pop-up */}
      {showObservePopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", maxWidth: "400px", textAlign: "center" }}>
            <h3>Observe {selectedStudent?.name}</h3>
            <p>{getDynamicText(selectedStudent, 'observe')}</p>
            <button onClick={() => setShowObservePopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorSim