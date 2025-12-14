import React from 'react'

export default function Navbar({ onAdd }) {
  return (
    <header className="app-nav">
      <div className="app-title">Task Board</div>
      <div>
        <button className="add-btn" onClick={onAdd}>+ Add Task</button>
      </div>
    </header>
  )
}
