# 📝 TODO LIST

# [Live demo](https://frontend-challenge-cor.vercel.app)

## Librerías que se utilizaron:

- Estilos con [TailwindCSS](https://tailwindcss.com/docs/installation).
- Paginado con [React Paginate](https://www.npmjs.com/package/react-paginate).
- Íconos con [React Icons](https://react-icons.github.io/react-icons).

## Consigna:

A partir de un formulario se deben crear tareas y agregarlas a un TODO LIST.

**Se espera contar con:**

- Un formulario para crear tareas.
- Un filtro con la funcionalidad de ordenar por Estado.
- Lista que contenga las tareas creadas.

**Características de una tarea:**

UI:

- Nombre.
- Descripción.
- Prioridad (alta, media, baja).
- Estado (nueva, en proceso, finalizada).
- Botón para eliminar.

Funcionalidad:

- En cada tarea se debe poder cambiar el estado y la prioridad.
- Se pueden eliminar tareas.


*El diseño de la aplicación queda por su cuenta como así la estructura del proyecto, librerías a usar, etc.*

*Si desea puede agregar otras funcionalidades que crea más convenientes (más filtros, paginado, etc), todo suma.*

## Explicación del proyecto:

Para encarar este proyecto utilice la `Context API` de React para manejar el estado global.

> `./src/context/TasksContext.jsx`.

Dentro de este archivo se encuentra el estado `tasks` donde se almacenan todas las tareas. Inicialmente, si ya existe en el `localStorage` trae la información de ahí, en caso contrario, crea un item con un array vacío.

También se encuentran las siguientes funciones:

- `addTask`: Permite crear una nueva tarea. Recibe como parámetro la tarea que se desea crear.
- `removeTask`: Permite eliminar una tarea existente. Recibe como parámetro el id de la tarea que se desea eliminar.
- `editTask`: Permite editar una tarea existente. Recibe como parámetros la nueva tarea que reemplaza a la que ya existía y el id de la tarea que se desea modificar.

Luego tiene un `useEffect` el cual recibe como dependencia nuestro estado `tasks`, lo que permite actualizar el `localStorage` cada vez que se cambia el valor de la dependencia.

Por último retorna estas funcionalidades para que se llamen en nuestra App mediante el custom hook de `useTasks`.

### Nuevas funcionalidades:

Decidí implementar un par de funcionalidades nuevas que me parecieron convenientes.

- Filtros por prioridad.
- Ordenamiento ascendente/descendente.
- Paginado con react-paginate.
