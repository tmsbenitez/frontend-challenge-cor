import { useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'

function TaskDialog({
  task,
  removeTask,
  editTask,
  clickAwayListener,
  setIsOpen
}) {
  // Estado para confirmar la eliminación
  const [sure, setSure] = useState(false)

  // Configurar un listener para cerrar cuando se hace clic fuera del componente
  const ref = useRef()
  clickAwayListener(ref, setIsOpen)

  // Maneja el cambio para actualizar la tarea editada
  const handleChange = ({ target }) => {
    editTask({ ...task, [target.name]: target.value }, task.id)
  }

  const handleRemove = e => {
    e.preventDefault()
    setSure(true)
    
    setTimeout(() => setSure(false), 5000) // Reiniciar el estado de confirmación después de 5 segundos

    if (sure && e.target) {
      removeTask(task.id) // Eliminar la tarea si la confirmación está activada y se hace clic en el botón de eliminar
    }
  }

  return (
    <div
      className='flex flex-col w-[1000px] relative h-[600px] p-6 md:p-16 rounded mx-6 gap-4 border bg-white duration-200'
      ref={ref}
    >
      <button
        className='absolute z-20 top-6 right-6 hover:text-red-500 text-2xl duration-200'
        onClick={() => setIsOpen(false)}
      >
        <FiX />
      </button>
      <input
        value={task?.title}
        name='title'
        onChange={handleChange}
        className='text-2xl font-medium hover:bg-zinc-200 px-2 hover:cursor-pointer focus:cursor-text rounded duration-200 outline-none focus:bg-zinc-200'
      />
      <div className='flex gap-8 w-full flex-col md:flex-row'>
        <label className='flex flex-col gap-2'>
          Estado:
          <select
            value={task?.status}
            name='status'
            onChange={handleChange}
            className='px-2 py-1 border rounded md:w-[200px]'
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
        <label className='flex flex-col gap-2'>
          Prioridad:
          <select
            value={task?.priority}
            name='priority'
            onChange={handleChange}
            className='px-2 py-1 border rounded md:w-[200px]'
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
      </div>
      <textarea
        value={task?.description}
        className='h-[300px] border p-4 outline-none focus:border-zinc-400 duration-200 rounded'
        name='description'
        onChange={handleChange}
        placeholder='Sin descripción'
      />
      <button
        className={`border border-red-300 w-48 flex relative ml-auto justify-center bg-red-100 px-6 py-2 rounded hover:bg-red-200 duration-200 ${
          sure && 'bg-red-300 border-red-500 hover:bg-red-400'
        }`}
        onClick={handleRemove}
      >
        {!sure ? 'Borrar tarea' : 'Confirmar'}
      </button>
    </div>
  )
}

export default TaskDialog
