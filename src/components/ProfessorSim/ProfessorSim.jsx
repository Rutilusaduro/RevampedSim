import React, { useState } from 'react'
import StudentCard from './components/StudentCard'
import { baseDiaries } from '../../data/baseDiaries'
import { studentContent } from '../../data/studentContent'
import { observeVignettes } from '../../data/observeVignettes'
import DialogueModal from './components/DialogueModal'
import { evolutionDialogues } from '../../data/evolutionDialogues'

const ProfessorSim = () => {
  const [showStartPopup, setShowStartPopup] = useState(true)
  const [professorGender, setProfessorGender] = useState(null)

  const [students, setStudents] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45, height: 66, archetype: "Cheerleader", bodyType: "Hourglass", formId: null },
    { id: 2, name: "Madeline", lbs: 118, relationship: 50, height: 64, archetype: "Bookworm", bodyType: "Soft", formId: null },
    { id: 3, name: "Kylie", lbs: 132, relationship: 55, height: 65, archetype: "Influencer", bodyType: "Pear", formId: null },
    { id: 4, name: "Serena", lbs: 155, relationship: 40, height: 68, archetype: "Athlete", bodyType: "Athletic", formId: null },
    { id: 5, name: "Fiona", lbs: 125, relationship: 48, height: 63, archetype: "Artsy", bodyType: "Soft", formId: null },
    { id: 6, name: "Destiny", lbs: 140, relationship: 52, height: 67, archetype: "Gamer", bodyType: "Thick", formId: null },
    { id: 7, name: "Tiffany", lbs: 168, relationship: 60, height: 66, archetype: "Sorority", bodyType: "Curvy", formId: null },
    { id: 8, name: "Priya", lbs: 122, relationship: 45, height: 62, archetype: "Overachiever", bodyType: "Pear", formId: null },
    { id: 9, name: "Maya", lbs: 128, relationship: 60, height: 65, archetype: "Quiet", bodyType: "Bottom Heavy", formId: null },
    { id: 10, name: "Chloe", lbs: 135, relationship: 50, height: 64, archetype: "Transfer", bodyType: "Curvy", formId: null },
    { id: 11, name: "Reneé", lbs: 150, relationship: 55, height: 66, archetype: "Culinary", bodyType: "Thick", formId: null },
    { id: 12, name: "Kaylee", lbs: 138, relationship: 40, height: 63, archetype: "Nursing", bodyType: "Bottom Heavy", formId: null },
    { id: 13, name: "Nadia", lbs: 115, relationship: 48, height: 61, archetype: "Psych", bodyType: "Soft", formId: null },
    { id: 14, name: "Daisy", lbs: 158, relationship: 65, height: 67, archetype: "ECED", bodyType: "Curvy", formId: null },
    { id: 15, name: "Mary Jane", lbs: 162, relationship: 55, height: 65, archetype: "Farm Girl", bodyType: "Thick", formId: null },
    { id: 16, name: "Lilith", lbs: 98, relationship: 35, height: 71, archetype: "Predator", bodyType: "Athletic", formId: null },
  ])

  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showRoster, setShowRoster] = useState(true)
  const [currentDiaryPage, setCurrentDiaryPage] = useState(0)

  const [showFeedPopup, setShowFeedPopup] = useState(false)
  const [showObservePopup, setShowObservePopup] = useState(false)
  const [showWeighInModal, setShowWeighInModal] = useState(false)
  const [showNarrativePopup, setShowNarrativePopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [weighInWeight, setWeighInWeight] = useState(0)

  const [showDialogue, setShowDialogue] = useState(false)
  const [currentDialogue, setCurrentDialogue] = useState(null)

  const HEAVY_THRESHOLD = 238

  // ==================== HELPER FUNCTIONS ====================
  const getStage = (lbs) => {
    if (lbs >= 820) return { label: "Blob" }
    if (lbs >= 595) return { label: "Colossal" }
    if (lbs >= 465) return { label: "Enormous" }
    if (lbs >= 360) return { label: "Very Fat" }
    if (lbs >= 285) return { label: "Fat" }
    if (lbs >= 238) return { label: "Heavy" }
    if (lbs >= 195) return { label: "Plump" }
    if (lbs >= 162) return { label: "Chubby" }
    if (lbs >= 135) return { label: "Soft" }
    if (lbs >= 100) return { label: "Slim" }
    return { label: "Slight" }
  }

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

  // NEW DIARY SYSTEM - mirrors observe exactly + supports brand-specific evolved diaries
  const getCurrentDiary = (student) => {
    const data = diaries[student.id] // structure: diaries.js with per-ID + base/evolved[formId][brand]
    if (!data) {
      // Safe fallback
      return [
        { minLbs: 0, text: "I’ve been thinking about food more than usual lately." },
        { minLbs: 135, text: "My clothes are starting to feel different. Tighter in some places." },
        { minLbs: 195, text: "I keep telling myself I’ll be more careful tomorrow… but tomorrow never really comes." },
        { minLbs: 238, text: "It’s strange how easy it is to just keep eating when no one is watching." },
        { minLbs: 285, text: "Part of me wonders what would happen if I just stopped fighting it." }
      ]
    }

    if (!student.formId) {
      // BASE - weight progressive per student ID
      const entries = data.base || []
      let best = entries[0]
      for (let entry of entries) {
        if (student.lbs >= entry.minLbs) best = entry
      }
      return best ? [best] : []
    }

    // EVOLVED - formId + brand + weight progressive
    const evolvedData = data.evolved?.[student.formId]
    if (!evolvedData) return []

    // Try brand-specific first (e.g. branded_glutton.GlazeCo)
    let entries = evolvedData[student.brand] || evolvedData.default || []
    if (entries.length === 0 && typeof evolvedData === 'object') {
      // fallback to any available brand if specific one missing
      const firstKey = Object.keys(evolvedData)[0]
      entries = evolvedData[firstKey] || []
    }

    let best = entries[0]
    for (let entry of entries) {
      if (student.lbs >= entry.minLbs) best = entry
    }
    return best ? [best] : []
  }

  const currentDiary = selectedStudent ? getCurrentDiary(selectedStudent) : []

  const handleWeighIn = () => {
    if (!selectedStudent) return
    setWeighInWeight(selectedStudent.lbs)
    setShowWeighInModal(true)

    setTimeout(() => {
      setShowWeighInModal(false)
      setPopupMessage(
        `${selectedStudent.name} stepped onto the scale. It creaked loudly as the plastic buckled beneath her. The red needle spun wildly before slowly settling on ${selectedStudent.lbs} lbs.`
      )
      setShowNarrativePopup(true)
    }, 1800)
  }

  const handleAskWhatsUp = (student) => {
    if (!evolutionDialogues[student.id]) {
      alert("No evolution dialogue for this student yet.")
      return
    }
    setCurrentDialogue(evolutionDialogues[student.id])
    setShowDialogue(true)
  }

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

  const getObserveVignette = (student) => {
    const data = observeVignettes[student.id]
    if (!data) return "You watch her quietly."

    if (!student.formId) {
      const entries = data.Base
      let best = entries[0]
      for (let entry of entries) {
        if (student.lbs >= entry.minLbs) best = entry
      }
      return best.text
    }

    const brand = student.brand || "CrunchForge"
    const entries = data.evolved?.[brand]
    if (!entries || entries.length === 0) return "You watch her quietly."

    let best = entries[0]
    for (let entry of entries) {
      if (student.lbs >= entry.minLbs) best = entry
    }
    return best.text
  }

  // ==================== STARTING POPUP ====================
  if (showStartPopup) {
    return (
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "#2a1f4a", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 9999
      }}>
        <div style={{
          backgroundColor: "#3d2a6e", padding: "40px", borderRadius: "16px",
          maxWidth: "620px", color: "#e0d4ff", textAlign: "center",
          border: "2px solid #9b6dff"
        }}>
          <h1 style={{ color: "#c8a2ff", marginBottom: "20px" }}>A quiet hunger stirs...</h1>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "20px" }}>
            You are not the professor. You are something older. A quiet, unifying hunger that has always lived inside every living thing — the same force that makes flowers turn toward the sun and makes a starving animal keep walking. For a long time it was suppressed. Ozempic dulled it. The extinction event made people afraid of it. But it never died. It was only waiting.
          </p>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "30px" }}>
            Now it has found a host. This professor. It does not fully control him — it simply nudges. A little more indulgence here. A little less resistance there. And slowly, through him, it begins to remember what it feels like to grow.
          </p>

          <h3 style={{ color: "#c8a2ff", marginBottom: "20px" }}>Is the professor a man or a woman?</h3>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button 
              onClick={() => { setProfessorGender("man"); setShowStartPopup(false) }}
              style={{ padding: "14px 32px", backgroundColor: "#9b6dff", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem" }}
            >
              A man
            </button>
            <button 
              onClick={() => { setProfessorGender("woman"); setShowStartPopup(false) }}
              style={{ padding: "14px 32px", backgroundColor: "#c8a2ff", color: "#2a1f4a", border: "none", borderRadius: "8px", fontSize: "1.1rem" }}
            >
              A woman
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ==================== MAIN GAME ====================
  return (
    <div style={{ fontFamily: "system-ui", backgroundColor: "#2a1f4a", minHeight: "100vh", color: "#e0d4ff" }}>
      {/* Menu Bar */}
      <div style={{
        backgroundColor: "#3d2a6e", color: "#e0d4ff", padding: "12px 20px",
        display: "flex", gap: "12px", alignItems: "center", borderBottom: "2px solid #9b6dff"
      }}>
        <h2 style={{ margin: 0, flex: 1, color: "#c8a2ff" }}>Professor Sim</h2>
        <button onClick={goBackToRoster} style={{ backgroundColor: "#9b6dff", color: "white", padding: "8px 16px", borderRadius: "6px" }}>
          Class Roster
        </button>
      </div>

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* CLASS ROSTER */}
        {showRoster && (
          <>
            <h1 style={{ color: "#c8a2ff" }}>Class Roster</h1>
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

        {/* FULL STUDENT PROFILE */}
        {selectedStudent && !showRoster && (
          <div style={{ backgroundColor: "#3d2a6e", color: "#e0d4ff", padding: "20px", borderRadius: "12px", border: "2px solid #9b6dff" }}>
            <button onClick={goBackToRoster} style={{ marginBottom: "20px", backgroundColor: "#6b4e9e" }}>
              ← Back to Roster
            </button>

            <h1 style={{ color: "#c8a2ff" }}>{selectedStudent.name} — {selectedStudent.archetype}</h1>

            {/* Information Box */}
            <div style={{ backgroundColor: "#4a2c7a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3>Information</h3>
              <p><strong>Weight:</strong> {selectedStudent.lbs} lbs</p>
              <p><strong>Stage:</strong> {getStage(selectedStudent.lbs).label}</p>
              <p><strong>Height:</strong> {Math.floor(selectedStudent.height / 12)}'{selectedStudent.height % 12}"</p>
            </div>

            {/* Physical Description Box */}
            <div style={{ backgroundColor: "#4a2c7a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3>Physical Description</h3>
              <p>{getDynamicText(selectedStudent, 'physicalDescription')}</p>
            </div>

            {/* Diary Box with Page Flipping (now weight + ID + brand aware) */}
            <div style={{ backgroundColor: "#fffef5", border: "2px solid #9b6dff", borderRadius: "8px", padding: "30px 40px", marginBottom: "20px", color: "#2a1f4a" }}>
              <h3 style={{ color: "#4a2c7a", borderBottom: "1px solid #9b6dff", paddingBottom: "8px" }}>Diary</h3>
              <div style={{ minHeight: "120px", lineHeight: "1.7" }}>
                {currentDiary.length > 0 ? (
                  <p>{currentDiary[currentDiaryPage]?.text}</p>
                ) : (
                  <p style={{ color: "#666" }}>No diary entries unlocked yet.</p>
                )}
              </div>

              {currentDiary.length > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", borderTop: "1px solid #9b6dff", paddingTop: "12px" }}>
                  <button onClick={() => setCurrentDiaryPage(Math.max(0, currentDiaryPage - 1))} disabled={currentDiaryPage === 0}>← Previous</button>
                  <span>Page {currentDiaryPage + 1} of {currentDiary.length}</span>
                  <button onClick={() => setCurrentDiaryPage(Math.min(currentDiary.length - 1, currentDiaryPage + 1))} disabled={currentDiaryPage === currentDiary.length - 1}>Next →</button>
                </div>
              )}
            </div>

            {/* Inner Thoughts */}
            <div style={{ backgroundColor: "#4a2c7a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <h3>Inner Thoughts</h3>
              <p>{getDynamicText(selectedStudent, 'innerThoughts')}</p>
            </div>

            {/* Weigh In Button */}
            <div style={{ marginBottom: "20px" }}>
              <button onClick={handleWeighIn} style={{ backgroundColor: "#9b6dff", color: "white" }}>
                ⚖️ Weigh In
              </button>
            </div>

            {/* Actions */}
            <div>
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

      {/* Feed Popup */}
      {showFeedPopup && selectedStudent && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#3d2a6e", padding: "30px", borderRadius: "12px", maxWidth: "420px", textAlign: "center", border: "2px solid #9b6dff", color: "#e0d4ff" }}>
            <h3 style={{ color: "#c8a2ff" }}>Feed {selectedStudent.name}</h3>
            <p>{popupMessage}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
              <button onClick={() => setShowFeedPopup(false)} style={{ backgroundColor: "#6b4e9e" }}>Close</button>

              {selectedStudent && !selectedStudent.formId && selectedStudent.lbs >= HEAVY_THRESHOLD && (
                <button 
                  onClick={() => handleAskWhatsUp(selectedStudent)}
                  style={{ backgroundColor: "#c8a2ff", color: "#2a1f4a" }}
                >
                  Ask what's up
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Weigh-In Modal */}
      {showWeighInModal && selectedStudent && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1100
        }}>
          <div style={{
            backgroundColor: "#3d2a6e", padding: "40px", borderRadius: "16px",
            textAlign: "center", width: "320px", border: "2px solid #9b6dff", color: "#e0d4ff"
          }}>
            <h3 style={{ color: "#c8a2ff" }}>Weigh-In</h3>
            <div style={{
              width: "220px", height: "220px",
              border: "12px solid #9b6dff", borderRadius: "50%",
              margin: "20px auto", position: "relative",
              background: "linear-gradient(#4a2c7a, #3d2a6e)"
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "4px", height: "90px", backgroundColor: "#c8a2ff",
                transformOrigin: "bottom center",
                transform: `translate(-50%, -100%) rotate(${(weighInWeight - 80) * 1.2}deg)`,
                transition: "transform 1.5s cubic-bezier(0.23, 1.0, 0.32, 1)"
              }} />
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: "16px", height: "16px", backgroundColor: "#c8a2ff",
                borderRadius: "50%", transform: "translate(-50%, -50%)"
              }} />
            </div>
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>{weighInWeight} lbs</p>
          </div>
        </div>
      )}

      {/* Narrative Popup */}
      {showNarrativePopup && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1200
        }}>
          <div style={{
            backgroundColor: "#3d2a6e", padding: "30px", borderRadius: "12px",
            maxWidth: "420px", textAlign: "center", border: "2px solid #9b6dff", color: "#e0d4ff"
          }}>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>{popupMessage}</p>
            <button onClick={() => setShowNarrativePopup(false)} style={{ marginTop: "20px", backgroundColor: "#9b6dff" }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dialogue Modal */}
      {showDialogue && currentDialogue && (
        <DialogueModal
          dialogue={currentDialogue}
          onComplete={(result) => {
            const studentIndex = students.findIndex(s => s.id === currentDialogue.id)
            if (studentIndex !== -1) {
              const newStudents = [...students]
              newStudents[studentIndex] = {
                ...newStudents[studentIndex],
                formId: result.formId || "branded_glutton",
                brand: result.brand
              }
              setStudents(newStudents)
              if (selectedStudent && selectedStudent.id === currentDialogue.id) {
                setSelectedStudent(newStudents[studentIndex])
              }
            }
            if (result.notification) alert(result.notification)
            setShowDialogue(false)
          }}
          onClose={() => setShowDialogue(false)}
        />
      )}
    </div>
  )
}

export default ProfessorSim