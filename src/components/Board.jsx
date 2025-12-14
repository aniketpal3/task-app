import React, { useRef, useEffect, useState } from 'react'
import TaskCard from './TaskCard'

export default function Board({ tasksByStatus, onDragEnd, onEdit, onDelete, duplicates }) {
  const statuses = ['To-Do', 'In-Progress', 'Completed']
  const boardRef = useRef(null)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    function update() {
      const el = boardRef.current
      if (!el) return
      setShowNav(el.scrollWidth > el.clientWidth + 10)
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  function scrollByOffset(offset) {
    const el = boardRef.current
    if (!el) return
    el.scrollBy({ left: offset, behavior: 'smooth' })
  }

  function handleLeft() { scrollByOffset(-Math.round((boardRef.current?.clientWidth || 320) * 0.8)) }
  function handleRight() { scrollByOffset(Math.round((boardRef.current?.clientWidth || 320) * 0.8)) }

  function handleDragStart(e, task, idx) {
    e.dataTransfer.setData('text/plain', String(task.id))
    e.dataTransfer.setData('application/json', JSON.stringify({ status: task.status, index: idx }))
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(e, destStatus) {
    e.preventDefault()
    const draggableId = e.dataTransfer.getData('text/plain')
    const srcJson = e.dataTransfer.getData('application/json')
    let source = { droppableId: null, index: null }
    if (srcJson) {
      try { source = JSON.parse(srcJson) } catch (err) { /* ignore */ }
    }

    const container = e.currentTarget
    const children = Array.from(container.querySelectorAll('.task-draggable'))
    const y = e.clientY
    let destIndex = children.length
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect()
      if (y < rect.top + rect.height / 2) {
        destIndex = i
        break
      }
    }

    const result = {
      source: { droppableId: source.status || source.droppableId, index: source.index },
      destination: { droppableId: destStatus, index: destIndex },
      draggableId: String(draggableId)
    }

    if (!result.destination) return
    onDragEnd(result)
  }

  return (
    <div className="board-wrap">
      {showNav && (
        <>
          <button className="board-scroll-btn left" aria-label="Scroll left" onClick={handleLeft}>{'‹'}</button>
          <button className="board-scroll-btn right" aria-label="Scroll right" onClick={handleRight}>{'›'}</button>
        </>
      )}

      <div className="board" ref={boardRef}>
        {statuses.map(status => (
          <div key={status} className="column">
            <h4>{status}</h4>
            <div className={`column-list ${''}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
              {(tasksByStatus[status] || []).map((task, idx) => (
                <div
                  key={task.id}
                  className={`task-draggable`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, idx)}
                  data-id={task.id}
                >
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    duplicate={!!duplicates[status]?.[task.title]}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
