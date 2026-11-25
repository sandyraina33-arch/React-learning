import { useMemo, useState } from 'react'
import { Plus, Search, SlidersHorizontal, LayoutDashboard, CalendarCheck2, Sparkles } from 'lucide-react'
import StatCard from './components/StatCard'
import TaskCard from './components/TaskCard'
import TaskForm from './components/TaskForm'
import EmptyState from './components/EmptyState'
import { useTasks, useTaskStats } from './hooks/useTasks'

export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const stats = useTaskStats(tasks)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (status === 'All' || task.status === status) && (priority === 'All' || task.priority === priority)
  }), [tasks, search, status, priority])

  const openCreate = () => { setEditingTask(null); setIsFormOpen(true) }
  const openEdit = (task) => { setEditingTask(task); setIsFormOpen(true) }
  const saveTask = (task) => {
    if (editingTask) updateTask(editingTask.id, task)
    else addTask(task)
    setIsFormOpen(false)
    setEditingTask(null)
  }
  const resetFilters = () => { setSearch(''); setStatus('All'); setPriority('All') }

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#"><span className="brand-mark"><CalendarCheck2 size={21} /></span><span>taskflow</span></a>
      <p className="nav-label">WORKSPACE</p>
      <a className="nav-link active" href="#"><LayoutDashboard size={18} /> Overview</a>
      <div className="sidebar-tip"><Sparkles size={18} /><strong>Small steps add up.</strong><p>Keep your focus on the next task, not the whole mountain.</p></div>
      <div className="profile"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Personal workspace</small></div></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div><p className="eyebrow">TUESDAY, YOUR WORKSPACE</p><h1>Good morning, Jordan <span>✦</span></h1><p className="subheading">A clear plan makes a productive day.</p></div><button className="button primary" onClick={openCreate}><Plus size={17} /> New task</button></header>

      <section className="stats-grid" aria-label="Task summary">
        <StatCard label="Total tasks" value={stats.total} type="total" />
        <StatCard label="To do" value={stats.todo} type="todo" />
        <StatCard label="In progress" value={stats.inProgress} type="inProgress" />
        <StatCard label="Completed" value={stats.completed} type="completed" />
      </section>

      <section className="tasks-section">
        <div className="section-heading"><div><h2>Your tasks</h2><p>Manage priorities and keep moving forward.</p></div><span className="result-count">{filteredTasks.length} shown</span></div>
        <div className="toolbar">
          <div className="search-box"><Search size={17} /><input aria-label="Search tasks" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          <div className="filter-control"><SlidersHorizontal size={16} /><select aria-label="Filter by status" value={status} onChange={e => setStatus(e.target.value)}><option>All</option><option>Todo</option><option>In Progress</option><option>Done</option></select></div>
          <div className="filter-control"><select aria-label="Filter by priority" value={priority} onChange={e => setPriority(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select></div>
        </div>
        <div className="task-list">
          {filteredTasks.length ? filteredTasks.map(task => <TaskCard key={task.id} task={task} onStatusChange={(id, value) => updateTask(id, { status: value })} onEdit={openEdit} onDelete={id => { if (window.confirm('Delete this task?')) deleteTask(id) }} />) : <EmptyState onReset={resetFilters} />}
        </div>
      </section>
      <footer>Made for focused work <span>·</span> Your tasks are saved in this browser.</footer>
    </main>
    <TaskForm isOpen={isFormOpen} task={editingTask} onClose={() => setIsFormOpen(false)} onSave={saveTask} />
  </div>
}