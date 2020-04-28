<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold"
        v-model="name"
      >
      <textarea
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        v-model="description"
      />
      <AppButton @click="saveTask">Sauver</AppButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    // let task = this.getTask(this.$route.params.id)
    // console.log('task', task);
    return {
      name: '',
      description: ''
      // name: task.name,
      // description: task.name
    }
  },
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    saveTask () {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        taskPayload: {
          name: this.name,
          description: this.description
        }
      })
      this.$emit('close-modal')
    }
  },
  created () {
    this.name = this.task.name
    this.description = this.task.description
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}

.task-view textarea {
  border: 2px solid #efefef;
  padding: 10px 20px;
  margin-bottom: 10px;
}

.button {
  align-self: flex-end;
}
</style>
