import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyTask = { title: '', description: '', category: 'Learning', priority: 'Medium', status: 'Todo', dueDate: '' }

export default function TaskForm({ isOpen, task, onClose, onSave }) {
  const [form, setForm] = useState(emptyTask)

  useEffect(() => {
    setForm(task ? { ...task } : emptyTask)
  }, [task, isOpen])

  if (!isOpen) return null

  const change = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, title: form.title.trim() })
  }

  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="modal-heading"><div><p className="eyebrow">TASK DETAILS</p><h2 id="form-title">{task ? 'Edit task' : 'Create a task'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X /></button></div>
      <form onSubmit={submit}>
        <label>Task title<input name="title" value={form.title} onChange={change} placeholder="e.g. Finish React assignment" required maxLength="80" autoFocus /></label>
        <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Add a few details..." rows="3" /></label>
        <div className="form-grid">
          <label>Category<select name="category" value={form.category} onChange={change}><option>Learning</option><option>Work</option><option>Career</option><option>Personal</option></select></label>
          <label>Priority<select name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label>Status<select name="status" value={form.status} onChange={change}><option>Todo</option><option>In Progress</option><option>Done</option></select></label>
          <label>Due date<input type="date" name="dueDate" value={form.dueDate} onChange={change} /></label>
        </div>
        <div className="form-footer"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" type="submit">{task ? 'Save changes' : 'Add task'}</button></div>
      </form>
    </section>
  </div>
}