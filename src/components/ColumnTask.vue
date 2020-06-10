<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
    <AppDrag
      class="relative"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
    >
      <div class="close-task p-2 text-right absolute" @click="deleteTask" title="Delete Task"><span>╳</span></div>
      <div class="task" @click="goToTask(task)">
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}
        </span>
        <p
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ /* truncateDescription */ }}
          {{ task.description | truncate(10) }}
        </p>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
// import { truncateStringWords } from '@/utils'
export default {
  components: { AppDrag, AppDrop },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  // computed: {
  //   truncateDescription () {
  //     return truncateStringWords(this.task.description, 10)
  //   }
  // },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    deleteTask () {
      if (confirm('Are you sure you want to delete this task ?')) {
        this.$store.commit('DELETE_TASK', {
          columnIndex: this.columnIndex,
          taskIndex: this.taskIndex
        })
      }
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  cursor: pointer;
}

.close-task {
  position: absolute;
  right: 3px;
  cursor: pointer;
  font-size: 11px;
}
</style>
