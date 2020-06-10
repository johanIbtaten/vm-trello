<template>
  <!-- On écoute l'événement drop si il est déclenché on appelle
  la méthode moveTaskOrColumn qui se treouve dans la mixin
  movingTasksAndColumnsMixin -->
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <!-- On passe la props :transferDatale qui contient un objet
    qui définit le type d'élément qui déclenche le drag
    ici type column et l'index de la colonne dans l'objet board -->
    <AppDrag
      class="column relative"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="close-column absolute p-2 text-right" @click="deleteColumn" title="Delete Column"><span>╳</span></div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask (e, tasks) {
      if (e.target.value.trim() !== '') {
        this.$store.commit('CREATE_TASK', {
          tasks,
          name: e.target.value
        })
        e.target.value = ''
      }
    },
    deleteColumn () {
      if (confirm('Are you sure you want to delete this column ?')) {
        this.$store.commit('DELETE_COLUMN', this.columnIndex)
      }
    }
  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.close-column {
  font-size: 11px;
  top: 0;
  right: 5px;
  cursor: pointer;
}
</style>
