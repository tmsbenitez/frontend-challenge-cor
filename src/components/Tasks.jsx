import Filters from './Filters'
import { useState, useMemo } from 'react'
import Task from './Task'
import ReactPaginate from 'react-paginate'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

function Tasks({ tasks, removeTask, editTask, clickAwayListener }) {
  // Estado para el filtro actual
  const [filter, setFilter] = useState({
    priority: null,
    status: null
  })

  const [sort, setSort] = useState('asc')  // Estado para el ordenamiento actual

  const [pageNumber, setPageNumber] = useState(0)  // Estado para la página actual
  const tasksPerPage = 12 // Cantidad de tareas por página
  const pagesVisited = pageNumber * tasksPerPage // Cantidad de tareas saltadas por las páginas anteriores

  // Filtrado de tareas con useMemo para mejorar el rendimiento
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      return Object.keys(filter).every(key => {
        return !filter[key] || filter[key] === task[key]
      })
    })
    if (sort === 'desc') {
      filtered.reverse()
    }
    return filtered
  }, [filter, tasks, sort])

  // Cantidad de páginas necesarias para mostrar todas las tareas filtradas
  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage)

  // Función que se ejecuta al cambiar de página
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <section className='flex flex-col px-6'>
      <h2 className='text-2xl font-bold py-4'>Lista de tareas</h2>
      <Filters setFilter={setFilter} setSort={setSort} sort={sort} />
      <div className='border-t'>
        {tasks.length !== 0 && (
          <ReactPaginate
            previousLabel={
              <div className='flex items-center gap-1'>
                <BsArrowLeft />
                Anterior
              </div>
            }
            nextLabel={
              <div className='flex items-center gap-1'>
                Siguiente
                <BsArrowRight />
              </div>
            }
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName='flex justify-center my-6 gap-4'
            previousLinkClassName='text-gray-700 hover:text-gray-900'
            nextLinkClassName='text-gray-700 hover:text-gray-900'
            disabledClassName='opacity-50 cursor-not-allowed'
            activeClassName='font-bold'
          />
        )}

        <div className='grid md:grid-cols-4 sm:grid-cols-2 justify-items-start flex-wrap gap-4 max-w-[1200px] mb-16'>
          {tasks.length !== 0 ? (
            filteredTasks
              ?.slice(pagesVisited, pagesVisited + tasksPerPage)
              ?.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  editTask={editTask}
                  removeTask={removeTask}
                  clickAwayListener={clickAwayListener}
                />
              ))
          ) : (
            <p className='absolute text-xl opacity-80 mt-6'>
              No hay tareas para mostrar, crea una!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Tasks
