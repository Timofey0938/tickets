import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

const initialState = {
  columns: {
    [uuid()]: {
      title: 'Todo',
      tasks: [
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: 'Нарисовать иллюстрации для нового альбома',
          tags: [
            'violet',
            'green',
            'red',
            'orange',
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Сверстать лендинг по готовому шаблону',
          description: '',
          tags: [],
          comments: []
        },
        {
          id: uuid(),
          title: 'Сверстать лендинг по готовому шаблону',
          description: '',
          tags: [
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: '',
          tags: [
            'blue',
            'warmGreen',
            'darkBlue'
          ],
          comments: [
            {
              id: uuid(),
              userName: 'Иванов Игорь',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              id: uuid(),
              userName: 'Захаров Владислав',
              text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
            }
          ]
        }
      ],
      buttonContent: '+ Добавить'
    },
    [uuid()]: {
      title: 'In Progress',
      tasks: [
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: '',
          tags: [
            'violet',
            'green',
            'red',
            'orange',
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Сверстать лендинг по готовому шаблону',
          description: 'Верстка - дело серьезное',
          tags: [
            'violet',
            'green',
            'red',
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: 'Нарисовать от и до',
          tags: [
            'warmGreen',
            'darkBlue'
          ],
          comments: [
            {
              id: uuid(),
              userName: 'Иванов Иван',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              id: uuid(),
              userName: 'Захаров Захар',
              text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '
            }
          ]
        }
      ],
      buttonContent: '+ Добавить'
    },
    [uuid()]: {
      title: 'Done',
      tasks: [
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: '',
          tags: [
            'orange',
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Сверстать лендинг по готовому шаблону',
          description: '',
          tags: [
            'violet',
            'green',
            'red',
            'orange'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Сверстать лендинг по готовому шаблону',
          description: '',
          tags: [
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: '',
          tags: [
            'violet',
            'green',
            'red',
            'orange',
            'blue',
            'warmGreen',
            'darkBlue',
            'yellow'
          ],
          comments: []
        },
        {
          id: uuid(),
          title: 'Нарисовать иллюстрации',
          description: '',
          tags: [
            'green',
            'red'
          ],
          comments: []
        }
      ],
      buttonContent: ''
    }
  }
}

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addTicket(state, action) {
      console.log(action.payload.ticket);
      state.columns[action.payload.columnId].tasks.push({
        id: uuid(),
        ...action.payload.ticket,
        comments: []
      })
    },
    editTicket(state, action) {
      let newColumns = {};
      for (let key in state.columns) {
        let tickets = state.columns[key].tasks.map(task => {
          if (task.id === action.payload.id) {
            return action.payload;
          } else {
            return {...task};
          }
        });
        newColumns[key] = {...state.columns[key], tasks: tickets};
      }
      state.columns = newColumns;
    },
    moveTicket(state, action) {
      const {source, destination} = action.payload;
      if (source.droppableId === destination.droppableId) {
        const column = state.columns[source.droppableId];
        const copiedTasks = [...column.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);

        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...column,
            tasks: copiedTasks
          }
        };
      } else {
        const sourceColumn = state.columns[source.droppableId];
        const destinationColumn = state.columns[destination.droppableId];
        const sourceTasks = [...sourceColumn.tasks];
        const destinationTasks = [...destinationColumn.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, removed);

        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTasks
          },
          [destination.droppableId]: {
            ...destinationColumn,
            tasks: destinationTasks
          }
        };
      }
    },
    removeTicket(state, action) {
      let newColumns = {};
      for (let key in state.columns) {
        // console.log(state.columns[key].tasks);
        // console.log(action.pay)
        let tickets = state.columns[key].tasks.filter(task => task.id !== action.payload.id);
        newColumns[key] = {...state.columns[key], tasks: tickets};
      }
      state.columns = newColumns;
    }
  }
});

export const {addTicket, editTicket, moveTicket, removeTicket} = columnSlice.actions;
export default columnSlice.reducer;