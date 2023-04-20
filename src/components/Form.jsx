import { useState, useRef } from 'react'
import { FiPlusSquare, FiX } from 'react-icons/fi'

// Objeto que define los valores iniciales del formulario
const initialState = {
  title: '',
  description: '',
  priority: 'Baja',
  status: 'Nueva'
}

function Form({ addTask, setIsOpen, clickAwayListener }) {
  const [error, setError] = useState(false) // Estado del error al enviar el formulario
  const [task, setTask] = useState(initialState) // Estado del objeto con los valores del formulario

  // Configurar un listener para cerrar cuando se hace clic fuera del componente
  const ref = useRef(null)
  clickAwayListener(ref, setIsOpen)

  const handleSubmit = e => {
    e.preventDefault()

    // Si se agregó un título a la tarea, se añade a la lista de tareas, se resetea el formulario y se cierra
    if (task.title !== '') {
      addTask(task)
      setTask(initialState)
      setIsOpen(false)
    } else {
      // Si no se ha añadido un título, se muestra un mensaje de error
      setError(true)
    }
  }

  // Función que se ejecuta al cambiar los valores de los inputs del formulario
  const handleChange = ({ target }) => {
    setTask({
      ...task,
      [target.name]: target.value
    })
  }

  return (
    <form
      className='flex flex-col w-[450px] z-10 p-10 mx-6 rounded relative gap-4 border bg-white shadow-lg'
      onSubmit={handleSubmit}
      ref={ref}
    >
      <button
        type='button'
        className='text-2xl hover:text-red-500 duration-200 ml-auto absolute top-4 right-4'
        onClick={() => setIsOpen(false)}
      >
        <FiX />
      </button>
      <h2 className='text-xl font-medium flex items-center gap-2'>
        <FiPlusSquare /> Nueva tarea
      </h2>
      <label className='flex flex-col gap-1'>
        Título:
        <input
          type='text'
          className='border px-2 py-1 rounded outline-none focus:border-zinc-400 duration-200'
          name='title'
          value={task.title}
          onChange={handleChange}
          placeholder='Título'
        />
      </label>
      <label className='flex flex-col gap-1'>
        Prioridad:
        <select
          name='priority'
          value={task.priority}
          onChange={handleChange}
          className='px-2 py-1 rounded border'
        >
          <option value='Baja' name='Baja'>
            Baja
          </option>
          <option value='Media' name='Media'>
            Media
          </option>
          <option value='Alta' name='Alta'>
            Alta
          </option>
        </select>
      </label>
      <label className='flex flex-col gap-1'>
        Estado:
        <select
          name='status'
          value={task.status}
          onChange={handleChange}
          className='border px-2 py-1 rounded'
        >
          <option value='Nueva' name='Nueva'>
            Nueva
          </option>
          <option value='En Proceso' name='En Proceso'>
            En Proceso
          </option>
          <option value='Finalizada' name='Finalizada'>
            Finalizada
          </option>
        </select>
      </label>
      <label className='flex flex-col gap-1'>
        Descripción:
        <textarea
          className='border px-2 py-1 rounded resize-none h-48 outline-none focus:border-zinc-400 duration-200'
          name='description'
          onChange={handleChange}
          value={task.description}
          placeholder='Descripción'
        />
      </label>
      {error && (
        <p className='text-red-600 text-sm font-medium'>
          Por favor, agrega un título a la tarea.
        </p>
      )}
      <button
        type='submit'
        className='border ml-auto px-6 py-2 rounded hover:bg-zinc-50 duration-200'
      >
        Crear tarea
      </button>
    </form>
  )
}

export default Form
