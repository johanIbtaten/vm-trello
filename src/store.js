import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

// Si la propriété board est définie dans le localStorage
// On récupère le JSON et on le parse en objet js pour
// initialiser le state board sinon on initialise le state
// avec l'objet defaultBoard
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  // On charge le plugin saveStatePlugin qui se charge
  // de persister le store dans le localStorage quand il y a une
  // mutation
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      // On récupère le tableau des colonnes depuis le state board
      const columnList = state.board.columns

      // On extrait l'objet colonne qui se trouve au niveau
      // de l'index fromColumnIndex
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      // On le met à la place de l'index de la colonne
      // cible toColumnIndex
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
