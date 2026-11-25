import { useEffect, useMemo, useState } from 'react'
import { initialTasks } from '../data/initialTasks'

const STORAGE_KEY = 'taskflow.tasks.v1'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => setTasks(current => [{ ...task, id: Date.now() }, ...current])
  const updateTask = (id, changes) => setTasks(current => current.map(task => task.id === id ? { ...task, ...changes } : task))
  const deleteTask = (id) => setTasks(current => current.filter(task => task.id !== id))

  return { tasks, addTask, updateTask, deleteTask }
}

export function useTaskStats(tasks) {
  return useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'Done').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    todo: tasks.filter(task => task.status === 'Todo').length
  }), [tasks])
}