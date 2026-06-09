Iimport React, { useState } from 'react'
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
  const handleCardClick = (student) => {
    setSelectedStudent(student)
    setShowRoster(false)
  }

  const goBackToRoster = () => {
    setSelectedStudent(null)
    setShowRoster(true)
  }

  const getCurrentDiary = (student) => {
    if (student.formId && evolvedDiaries[student.formId]) {
      return evolvedDiaries[student.formId]
    }
    return baseDiaries[student.archetype.toLowerCase()] || []
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

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
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

            {/* Diary Box - Page Style */}
{selectedStudent && (
  <div style={{
    backgroundColor: "#fffef5",
    border: "2px solid #d4c4a8",
    borderRadius: "8px",
    padding: "30px 40px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    position: "relative",
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
      {getCurrentDiary(selectedStudent).length > 0 ? (
        <p style={{ margin: 0 }}>
          {getCurrentDiary(selectedStudent)[currentDiaryPage]?.text}
        </p>
      ) : (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          No diary entries unlocked yet.
        </p>
      )}
    </div>

    {/* Page Navigation */}
    {getCurrentDiary(selectedStudent).length > 1 && (
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
          style={{ 
            opacity: currentDiaryPage === 0 ? 0.4 : 1,
            cursor: currentDiaryPage === 0 ? "not-allowed" : "pointer"
          }}
        >
          ← Previous Entry
        </button>

        <span style={{ 
          color: "#8b6f47", 
          fontSize: "0.9rem",
          fontFamily: "Georgia, serif"
        }}>
          Page {currentDiaryPage + 1} of {getCurrentDiary(selectedStudent).length}
        </span>

        <button 
          onClick={() => setCurrentDiaryPage(Math.min(getCurrentDiary(selectedStudent).length - 1, currentDiaryPage + 1))}
          disabled={currentDiaryPage === getCurrentDiary(selectedStudent).length - 1}
          style={{ 
            opacity: currentDiaryPage === getCurrentDiary(selectedStudent).length - 1 ? 0.4 : 1,
            cursor: currentDiaryPage === getCurrentDiary(selectedStudent).length - 1 ? "not-allowed" : "pointer"
          }}
        >
          Next Entry →
        </button>
      </div>
    )}
  </div>
)}
                {getCurrentDiary(selectedStudent).length > 0 ? (
                  getCurrentDiary(selectedStudent).map((entry, index) => (
                    <p key={index} style={{ marginBottom: "16px" }}>{entry}</p>
                  ))
                ) : (
                  <p style={{ color: "#999" }}>No diary entries yet.</p>
                )}
              </div>
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