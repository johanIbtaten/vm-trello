<template>
    <button
      v-on="$listeners"
      v-bind="$attrs"
      class="button"
    >
      <slot />
    </button>
</template>

<script>
export default {
}
</script>

<style scoped>
.button {
  @apply inline-flex px-4 py-2 text-white font-bold rounded items-center bg-teal;
}

.button:hover {
  @apply bg-teal-dark;
}
</style>
