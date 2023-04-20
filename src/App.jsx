import { useState } from 'react'
import Form from './components/Form'
import Tasks from './components/Tasks'
import { useTasks } from './context/TasksContext'
import { RxCheckbox } from 'react-icons/rx'
import { FiPlusSquare } from 'react-icons/fi'

function App() {
  // Obtiene el value del contexto
  const { tasks, addTask, removeTask, editTask } = useTasks()

  // Maneja el Form de crear tarea
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(true)

  // Añade un listener de eventos para que cuando se hace clic afuera o se presiona Esc, cerrarla
  const clickAwayListener = (ref, toggle) => {
    const handleClickAway = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false)
      }
    }
    const handleEscape = event => {
      if (event.keyCode === 27) {
        toggle(false)
      }
    }
    document.addEventListener('mouseup', handleClickAway)
    document.addEventListener('keydown', handleEscape)
  }

  return (
    <main className='flex flex-col mx-auto max-w-5xl h-full w-full'>
      <div className='flex justify-between items-center border-b px-6'>
        <h1 className='flex items-center gap-2 font-bold text-xl py-8 h-fit'>
          <RxCheckbox className='w-6 h-6' />
          Todo List.
        </h1>
        <button
          className='flex gap-2 items-center hover:bg-white h-fit px-4 py-2 rounded duration-200'
          onClick={handleClick}
        >
          <FiPlusSquare className='w-6 h-6' />
          Nueva tarea
        </button>
        {isOpen && (
          <div className='flex items-center justify-center z-50 bg-black/10 w-full h-full fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <Form
              addTask={addTask}
              setIsOpen={setIsOpen}
              clickAwayListener={clickAwayListener}
            />
          </div>
        )}
      </div>
      <Tasks
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        clickAwayListener={clickAwayListener}
      />
    </main>
  )
}

export default App
