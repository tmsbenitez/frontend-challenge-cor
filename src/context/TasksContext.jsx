import React, { useState, useContext, useEffect, useCallback } from 'react'

// Crea un contexto de tareas
const TasksContext = React.createContext()

// Custom Hook para acceder al contexto de las tareas
export const useTasks = () => {
  return useContext(TasksContext)
}

// Proveedor de tareas
function TasksProvider({ children }) {
  // Definir estado para tareas y contador de tareas
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })
  const [taskCounter, setTaskCounter] = useState(tasks.length)

  // Función para agregar una tarea
  const addTask = useCallback(
    task => {
      const taskWithId = {
        ...task,
        id: taskCounter
      }
      setTasks(prevTasks => [...prevTasks, taskWithId])
      setTaskCounter(prevCounter => prevCounter + 1)
    },
    [taskCounter]
  )

  // Función para eliminar una tarea
  const removeTask = useCallback(id => {
    setTasks(prevTasks => {
      const index = prevTasks.findIndex(task => task.id === id)
      if (index !== -1) {
        const updatedTasks = [...prevTasks]
        updatedTasks.splice(index, 1)
        return updatedTasks
      }
      return prevTasks
    })
  }, [])

  // Función para editar una tarea
  const editTask = useCallback((task, id) => {
    setTasks(prevTasks => {
      const index = prevTasks.findIndex(task => task.id === id)
      const updatedTasks = [...prevTasks]
      updatedTasks[index] = task
      return updatedTasks
    })
  }, [])

  // Guardar tareas en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const value = { tasks, addTask, removeTask, editTask }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export default TasksProvider
