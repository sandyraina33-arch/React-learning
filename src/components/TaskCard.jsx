import { CalendarDays, Pencil, Trash2 } from 'lucide-react'

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  return <article className="task-card">
    <div className="task-main">
      <div className="task-title-row">
        <h3>{task.title}</h3>
        <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <p className="task-description">{task.description || 'No description provided.'}</p>
      <div className="task-meta">
        <span className="category">{task.category}</span>
        <span><CalendarDays size={14} /> {task.dueDate || 'No due date'}</span>
      </div>
    </div>
    <div className="task-actions">
      <select aria-label={`Status for ${task.title}`} value={task.status} onChange={e => onStatusChange(task.id, e.target.value)}>
        <option>Todo</option><option>In Progress</option><option>Done</option>
      </select>
      <button className="icon-button" aria-label="Edit task" onClick={() => onEdit(task)}><Pencil size={16} /></button>
      <button className="icon-button danger" aria-label="Delete task" onClick={() => onDelete(task.id)}><Trash2 size={16} /></button>
    </div>
  </article>
}