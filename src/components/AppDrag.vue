<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <!-- slot qui contient l'élement que l'on veut rendre
    draggable -->
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    // Quand On commence à dragger
    onDrag (e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      // On stock l'objet transfertData dans les données à tranférer
      // à l'endroit où l'on va drop l'élément, on stringify
      // l'objet avant de le stocker
      e.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
