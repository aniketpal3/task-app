import React from 'react'

export default function Filters({ filters, setFilters, sortMode, setSortMode }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Priority:</label>
        <select value={filters.priority || ''} onChange={(e) => setFilters(prev => ({...prev, priority: e.target.value || null}))}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Status:</label>
        <select value={filters.status || ''} onChange={(e) => setFilters(prev => ({...prev, status: e.target.value || null}))}>
          <option value="">All</option>
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort:</label>
        <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="closest">Closest due date</option>
        </select>
      </div>
    </div>
  )
}
