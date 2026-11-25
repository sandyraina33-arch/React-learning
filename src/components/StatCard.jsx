import { CheckCircle2, Circle, Clock3, ListTodo } from 'lucide-react'

const icons = { total: ListTodo, completed: CheckCircle2, inProgress: Clock3, todo: Circle }

export default function StatCard({ label, value, type }) {
  const Icon = icons[type]
  return <article className="stat-card">
    <div className={`stat-icon ${type}`}><Icon size={19} /></div>
    <div><p>{label}</p><strong>{value}</strong></div>
  </article>
}