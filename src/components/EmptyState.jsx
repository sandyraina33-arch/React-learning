import { SearchX } from 'lucide-react'
export default function EmptyState({ onReset }) {
  return <div className="empty-state"><SearchX size={34} /><h3>No tasks found</h3><p>Try changing the search term or filters.</p><button className="button secondary" onClick={onReset}>Clear filters</button></div>
}