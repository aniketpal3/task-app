import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

export default function Column({ status, tasks, onEdit, onDelete, duplicates }) { // eslint-disable-line no-unused-vars
  return (
    <div className="column">
      <h4>{status}</h4>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={`column-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}>
            {tasks.map((task, idx) => (
              <div key={task.id} draggableId={`${task.id}`} index={idx}>
                {/* Draggable container: the Draggable wrapper will be provided in Board to keep import minimal here */}
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
