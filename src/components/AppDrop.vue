<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <!-- slot qui contient l'élement qui recevoir un drop -->
    <slot/>
  </div>
</template>

<script>
export default {
  methods: {
    // Quand on drop un élément qui a été draggé
    onDrop (e) {
      // On récupère les données contenu dans le drag
      // via dataTransfer, on convertit d'abord la chaîne JSON
      // en objet js avec parse() avant de le récupérer dans la
      // variable transferData
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))
      // On émet vers le parent du composant un évenement drop
      // avec l'objet transferData en payload
      this.$emit('drop', transferData)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
