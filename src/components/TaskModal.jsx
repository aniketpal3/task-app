import React, { useState, useEffect } from 'react'

export default function TaskModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(() => initial || {
    title: '', description: '', priority: 'Low', dueDate: '', status: 'To-Do'
  })

  useEffect(() => {
    if (initial) {
      setForm(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial?.id])

  if (!open) return null

  function change(e) {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return alert('Title is required')
    onSave(form)
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e)=>e.stopPropagation()}>
        <h3>{initial ? 'Edit Task' : 'Add Task'}</h3>
        <form onSubmit={submit} className="modal-form">
          <label>Title<input name="title" value={form.title} onChange={change} /></label>
          <label>Description<textarea name="description" value={form.description} onChange={change} /></label>
          <label>Priority
            <select name="priority" value={form.priority} onChange={change}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
          <label>Due Date<input type="datetime-local" name="dueDate" value={form.dueDate} onChange={change} /></label>
          <label>Status
            <select name="status" value={form.status} onChange={change}>
              <option>To-Do</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
