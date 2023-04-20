import { useState } from 'react'
import TaskDialog from './TaskDialog'

function Task({ task, removeTask, editTask, clickAwayListener }) {
  const [isOpen, setIsOpen] = useState(false)
  const colours = {
    baja: 'bg-green-400',
    media: 'bg-amber-400',
    alta: 'bg-red-400'
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex flex-col w-full justify-between relative h-[220px] p-6 rounded gap-4 border md:hover:shadow-lg md:hover:-translate-y-1 duration-200 ${
          Object.keys(colours)?.includes(task.priority?.toLowerCase())
            ? colours[task.priority?.toLowerCase()]
            : ''
        }`}
      >
        <div className='bg-white h-full w-full absolute top-1 left-0' />
        <p className='truncate text-2xl font-medium w-full text-left z-10'>
          {task?.title}
        </p>
        <p className='line-clamp-2 text-left z-10 text-sm'>{task?.description || 'Sin descripción.'}</p>
        <div className='flex flex-col gap-2 z-10 text-sm'>
          <label className='flex items-center gap-2'>
          Estado:
          <p className='border px-2 rounded border-zinc-300 bg-zinc-50'>{task?.status}</p>
          </label>
          <label className='flex items-center gap-2'>
          Prioridad:
          <p className='border px-2 rounded border-zinc-300 bg-zinc-50'>{task?.priority}</p>
          </label>
        </div>
      </button>
      {isOpen && (
        <div className='flex items-center z-50 justify-center bg-black/10 w-full h-full fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
          <TaskDialog
            task={task}
            editTask={editTask}
            removeTask={removeTask}
            clickAwayListener={clickAwayListener}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </>
  )
}

export default Task
