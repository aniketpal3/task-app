import React from 'react'
import { format } from 'date-fns'

export default function TaskCard({ task, onEdit, onDelete, duplicate }) {
  const due = task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due'

  return (
    <div 
      className={`task-card priority-${task.priority.toLowerCase()}`}
    >
      <div className="task-card-top">
        <strong>{task.title}{duplicate ? ' • Duplicate' : ''}</strong>
        <div className="task-priority">{task.priority}</div>
      </div>
      <div className="task-desc">{task.description}</div>
      <div className="task-meta">
        <span className="meta-label">Due:</span> {due}
      </div>
      <div className="task-actions">
        <button className="small" onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</button>
        <button className="small danger" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</button>
      </div>
    </div>
  )
}
