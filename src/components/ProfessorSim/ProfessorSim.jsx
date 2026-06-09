import React, { useState } from 'react'
import StudentCard from './components/StudentCard'
import { baseDiaries } from '../../data/baseDiaries'
import { evolvedDiaries } from '../../data/evolvedDiaries'
import { studentContent } from '../../data/studentContent'

const ProfessorSim = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45, height: 66, archetype: "Cheerleader", formId: null },
    { id: 9, name: "Maya", lbs: 128, relationship: 60, height: 65, archetype: "Quiet", formId: null },
  ])

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRoster, setShowRoster] = useState(true)
  const [currentDiaryPage, setCurrentDiaryPage] = useState(0)

  // Pop-up states
  const [showFeedPopup, setShowFeedPopup] = useState(false)
  const [showObservePopup, setShowObservePopup] = useState(false)
  const [showWeighInModal, setShowWeighInModal] = useState(false)
  const [showNarrativePopup, setShowNarrativePopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [weighInWeight, setWeighInWeight] = useState(0)

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

  const getCurrentDiary = (student) => {
    if (student.formId && evolvedDiaries[student.formId]) {
      return evolvedDiaries[student.formId]
    }
    return baseDiaries[student.archetype.toLowerCase()] || []
  }

  const currentDiary = selectedStudent ? getCurrentDiary(selectedStudent) : []

  const getDynamicText = (student, type) => {
    if (!studentContent[student.id]) return "[Content not available yet]"
    const contentSet = student.formId ? studentContent[student.id].evolved : studentContent[student.id].base
    if (!contentSet || !contentSet[type]) return "[Content not available yet]"
    const entries = contentSet[type]
    let bestEntry = entries[0]
    for (let entry of entries) {
      if (student.lbs >= entry.minLbs) bestEntry = entry
    }
    return bestEntry.text
  }

  // Feed logic with popup
  const tryFeedStudent = (id) => {
    const studentIndex = students.findIndex(s => s.id === id)
    if (studentIndex === -1) return

    const student = students[studentIndex]

    if (!student.formId && student.lbs >= HEAVY_THRESHOLD) {
      setPopupMessage("She's too lost in thought to eat more right now...")
      setShowFeedPopup(true)
      return
    }

    const newStudents = [...students]
    newStudents[studentIndex] = { ...student, lbs: student.lbs + 8 }
    setStudents(newStudents)

    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(newStudents[studentIndex])
    }
  }

  // Weigh-In feature
  const handleWeighIn = () => {
    if (!selectedStudent) return
    setWeighInWeight(selectedStudent.lbs)
    setShowWeighInModal(true)

    // Simulate scale spinning and settling
    setTimeout(() => {
      setShowWeighInModal(false)
      setPopupMessage(
        `${selectedStudent.name} stepped onto the scale. It creaked loudly as the plastic buckled beneath her. The red needle spun wildly before slowly settling on ${selectedStudent.lbs} lbs.`
      )
      setShowNarrativePopup(true)
    }, 1800)
  }

  return (
    <div style={{ fontFamily: "system-ui", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Menu Bar */}
      <div style={{ backgroundColor: "#222", color: "white", padding: "12px 20px", display: "flex", gap: "12px", alignItems: "center" }}>
        <h2 style={{ margin: 0, flex: 1 }}>Professor Sim</h2>
        <button onClick={goBackToRoster}>Class Roster</button>
      </div>

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Class Roster */}
        {showRoster && (
          <>
            <h1>Class Roster</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px", marginTop: "20px" }}>
              {students.map(student => (
                <StudentCard key={student.id} student={student} onClick={() => handleCardClick(student)} />
              ))}
            </div>
          </>
        )}

        {/* Profile View */}
        {selectedStudent && (
          <div style={{ backgroundColor: "#ffffff", color: "#222", padding: "20px", borderRadius: "8px" }}>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px" }}>← Back to Roster</button>

            <h1>{selectedStudent.name} — {selectedStudent.archetype}</h1>

            {/* Information */}
            <div style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3>Information</h3>
              <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
              <p><strong>Height:</strong> {Math.floor(selectedStudent.height / 12)}'{selectedStudent.height % 12}"</p>
              <p><strong>BMI:</strong> {(selectedStudent.lbs / 2.205 / Math.pow(selectedStudent.height * 0.0254, 2)).toFixed(1)}</p>
            </div>

            {/* Weigh In Button */}
            <div style={{ marginBottom: "20px" }}>
              <button 
                onClick={handleWeighIn}
                style={{
                  backgroundColor: "#5c4636",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  border: "none",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                ⚖️ Weigh In
              </button>
            </div>

            {/* Physical Description */}
            <div style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
              <h3>Physical Description</h3>
              <p>{getDynamicText(selectedStudent, 'physicalDescription')}</p>
            </div>

            {/* Diary with Page Flip Animation */}
            <div style={{
              backgroundColor: "#fffef5",
              border: "2px solid #d4c4a8",
              borderRadius: "8px",
              padding: "30px 40px",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              minHeight: "220px",
              transition: "all 0.3s ease"
            }}>
              <h3 style={{ color: "#5c4636", borderBottom: "1px solid #d4c4a8", paddingBottom: "8px" }}>Diary</h3>

              <div 
                key={currentDiaryPage} 
                style={{ 
                  minHeight: "120px", 
                  color: "#3f2e1e", 
                  fontFamily: "Georgia, serif", 
                  fontSize: "1.05rem", 
                  lineHeight: "1.7",
                  animation: "pageFlip 0.4s ease"
                }}
              >
                {currentDiary.length > 0 ? (
                  <p style={{ margin: 0 }}>{currentDiary[currentDiaryPage]?.text}</p>
                ) : (
                  <p style={{ color: "#888", fontStyle: "italic" }}>No diary entries unlocked yet.</p>
                )}
              </div>

              {currentDiary.length > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", borderTop: "1px solid #d4c4a8", paddingTop: "12px" }}>
                  <button onClick={() => setCurrentDiaryPage(Math.max(0, currentDiaryPage - 1))} disabled={currentDiaryPage === 0}>← Previous</button>
                  <span style={{ color: "#8b6f47" }}>Page {currentDiaryPage + 1} of {currentDiary.length}</span>
                  <button onClick={() => setCurrentDiaryPage(Math.min(currentDiary.length - 1, currentDiaryPage + 1))} disabled={currentDiaryPage === currentDiary.length - 1}>Next →</button>
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

      {/* Weigh-In Scale Modal */}
      {showWeighInModal && selectedStudent && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100 }}>
          <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", textAlign: "center", width: "320px" }}>
            <h3>Weigh-In</h3>
            <div style={{ 
              width: "220px", 
              height: "220px", 
              border: "12px solid #333", 
              borderRadius: "50%", 
              margin: "20px auto",
              position: "relative",
              background: "linear-gradient(#f5f5f5, #e0e0e0)"
            }}>
              {/* Scale Needle */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "4px",
                height: "90px",
                backgroundColor: "#c0392b",
                transformOrigin: "bottom center",
                transform: `translate(-50%, -100%) rotate(${(weighInWeight - 80) * 1.2}deg)`,
                transition: "transform 1.5s cubic-bezier(0.23, 1.0, 0.32, 1)"
              }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", width: "16px", height: "16px", backgroundColor: "#333", borderRadius: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>{weighInWeight} lbs</p>
          </div>
        </div>
      )}

      {/* Narrative Popup after Weigh-In */}
      {showNarrativePopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200 }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", maxWidth: "420px", textAlign: "center" }}>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>{popupMessage}</p>
            <button onClick={() => setShowNarrativePopup(false)} style={{ marginTop: "20px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfessorSim