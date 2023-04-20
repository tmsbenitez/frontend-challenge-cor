import { BsSortUp, BsSortDown } from 'react-icons/bs'

function Filters({ setFilter, sort, setSort }) {
  const handleChange = ({ target }) => {
    setFilter(prevFilter => ({ ...prevFilter, [target.name]: target.value }))
  }

  const handleClick = () => {
    if (sort === 'desc') {
      setSort('asc')
    } else {
      setSort('desc')
    }
  }

  return (
    <div className='flex pb-6 gap-4 flex-col sm:flex-row'>
      <label className='flex gap-2 items-center'>
        Prioridad:
        <select
          onChange={handleChange}
          name='priority'
          className='px-2 py-1 border rounded'
        >
          <option value=''>Todas</option>
          <option value='Baja'>Baja</option>
          <option value='Media'>Media</option>
          <option value='Alta'>Alta</option>
        </select>
      </label>
      <label className='flex gap-2 items-center'>
        Estado:
        <select
          onChange={handleChange}
          name='status'
          className='px-2 py-1 border rounded'
        >
          <option value=''>Todas</option>
          <option value='Nueva'>Nueva</option>
          <option value='En Proceso'>En Proceso</option>
          <option value='Finalizada'>Finalizada</option>
        </select>
      </label>
      <button onClick={handleClick} className='text-xl'>
        {sort === 'desc' ? <BsSortUp /> : <BsSortDown />}
      </button>
    </div>
  )
}

export default Filters
