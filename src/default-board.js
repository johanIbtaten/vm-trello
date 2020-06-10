import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'Todo',
      tasks: [
        {
          description: '',
          name: 'First task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'Second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'And third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'In-progress',
      tasks: [
        {
          description: '',
          name: 'First task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'Done',
      tasks: [
        {
          description: '',
          name: 'First task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
