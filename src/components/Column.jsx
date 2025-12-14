import React from 'react'
import TaskCard from './TaskCard'

export default function Column({ status, tasks = [], onEdit, onDelete, duplicates }) { // eslint-disable-line no-unused-vars
  return (
    <div className="column">
      <h4>{status}</h4>
      <div className={`column-list`}>
        {tasks.map((task, idx) => (
          <div key={task.id} className="task-draggable">
            <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} duplicate={!!duplicates[status]?.[task.title]} />
          </div>
        ))}
      </div>
    </div>
  )
}
