import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

export default function Board({ tasksByStatus, onDragEnd, onEdit, onDelete, duplicates }) {
  const statuses = ['To-Do', 'In-Progress', 'Completed']
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {statuses.map(status => (
          <div key={status} className="column">
            <h4>{status}</h4>
            <Droppable droppableId={status} type="TASK">
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps} 
                  className={`column-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                >
                  {(tasksByStatus[status] || []).map((task, idx) => (
                    <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`task-draggable ${dragSnapshot.isDragging ? 'dragging' : ''}`}
                          style={{
                            ...dragProvided.draggableProps.style,
                          }}
                        >
                          <TaskCard 
                            task={task} 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                            duplicate={!!duplicates[status]?.[task.title]} 
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
