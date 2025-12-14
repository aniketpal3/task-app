import React, { useEffect, useState, useMemo, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Filters from './components/Filters'
import Board from './components/Board'
import TaskModal from './components/TaskModal'
import initialTasks from './data/tasks.json'
import { v4 as uuidv4 } from 'uuid'

function groupByStatus(tasks) {
  return tasks.reduce((acc, t) => {
    acc[t.status] = acc[t.status] || []
    acc[t.status].push(t)
    return acc
  }, {})
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({priority: null, status: null})
  const [sortMode, setSortMode] = useState('newest')
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const raw = localStorage.getItem('tasks')
    if (raw) {
      try { 
        setTasks(JSON.parse(raw)) 
      } catch { 
        setTasks(initialTasks) 
      }
    } else {
      setTasks(initialTasks)
    }
  }, [])

  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)) }, [tasks])

  function openAdd() { setEditing(null); setModalOpen(true) }

  function handleSave(form) {
    if (editing) {
      setTasks(prev => prev.map(t => t.id === editing.id ? {...t, ...form} : t))
    } else {
      const newTask = {
        id: uuidv4(),
        title: form.title,
        description: form.description || '',
        priority: form.priority || 'Low',
        status: form.status || 'To-Do',
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        createdAt: new Date().toISOString()
      }
      // handle duplicate names in same board: append (n)
      const same = tasks.filter(t => t.title === newTask.title && t.status === newTask.status)
      if (same.length) {
        newTask.title = `${newTask.title} (${same.length + 1})`
      }
      setTasks(prev => [newTask, ...prev])
    }
    setModalOpen(false)
  }

  function handleEdit(task) { setEditing(task); setModalOpen(true) }

  function handleDelete(id) {
    if (!confirm('Delete this task?')) return
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function onDragEnd(result) {
    if (!result.destination) return
    const { source, destination, draggableId } = result
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    setTasks(prev => {
      const copy = Array.from(prev)
      const idx = copy.findIndex(t => String(t.id) === draggableId)
      if (idx === -1) return prev
      const [moved] = copy.splice(idx, 1)
      moved.status = destination.droppableId

      // find indices of items in copy that belong to destination status
      const destIndices = copy.map((t, i) => ({ t, i })).filter(x => x.t.status === destination.droppableId).map(x => x.i)

      let insertAt = copy.length // default append
      if (destIndices.length === 0) {
        // insert at end
        insertAt = copy.length
      } else if (destination.index >= destIndices.length) {
        // place after the last item of that status
        insertAt = destIndices[destIndices.length - 1] + 1
      } else {
        // place before the item at the destination.index among that status items
        insertAt = destIndices[destination.index]
      }

      copy.splice(insertAt, 0, moved)
      return copy
    })
  }

  const duplicates = useMemo(() => {
    const map = {}
    tasks.forEach(t => {
      map[t.status] = map[t.status] || {}
      map[t.status][t.title] = (map[t.status][t.title] || 0) + 1
    })
    // convert to boolean map
    Object.keys(map).forEach(s => {
      Object.keys(map[s]).forEach(title => { map[s][title] = map[s][title] > 1 })
    })
    return map
  }, [tasks])

  const filtered = useMemo(() => {
    let arr = [...tasks]
    if (filters.priority) arr = arr.filter(t => t.priority === filters.priority)
    if (filters.status) arr = arr.filter(t => t.status === filters.status)
    if (sortMode === 'newest') arr.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    if (sortMode === 'oldest') arr.sort((a,b)=> new Date(a.createdAt) - new Date(b.createdAt))
    if (sortMode === 'closest') arr.sort((a,b)=> {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
    return arr
  }, [tasks, filters, sortMode])

  const tasksByStatus = groupByStatus(filtered)

  return (
    <div className="app-root">
      <Navbar onAdd={openAdd} />
      <main className="container">
        <Filters filters={filters} setFilters={setFilters} sortMode={sortMode} setSortMode={setSortMode} />
        <Board tasksByStatus={tasksByStatus} onDragEnd={onDragEnd} onEdit={handleEdit} onDelete={handleDelete} duplicates={duplicates} />
      </main>
      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  )
}
