import React, { useState } from 'react'
import StudentCard from './components/StudentCard'

const ProfessorSim = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Brittany", lbs: 145, relationship: 45 },
    { id: 2, name: "Maya", lbs: 128, relationship: 60 },
    { id: 3, name: "Mary Jane", lbs: 162, relationship: 55 },
    { id: 4, name: "Kaylee", lbs: 138, relationship: 40 },
  ])

  const feedStudent = (id) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? { ...student, lbs: student.lbs + 8 }
          : student
      )
    )
  }

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Professor Sim (Reboot)</h1>
      <p>Week 1 • AP: 12 • Scrutiny: 8</p>

      <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        {students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onFeed={() => feedStudent(student.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfessorSim
