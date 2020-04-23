export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        // Si le type est 'column'
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      })
    },
    // On récupère l'index de la colonne dans le tableau d'objet
    // columns
    moveColumn ({ fromColumnIndex }) {
      // On appelle la mutation MOVE_COLUMN du store en lui passant
      // l'index de la colonne contenu dans transferData et l'index
      // de la colonne qui reçoit l'événement drop qui provient de
      // la props this.columnIndex
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
  }
}
