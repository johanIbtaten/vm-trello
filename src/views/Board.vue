<template>
  <div class="board">
    <div class="other-mods">
      <a
        href="https://johanibtaten.github.io/vmod-texteditor-demo/"
        target="_blank"
        class="btn-mod"
        >Démo Vue Module 1</a
      >
      <a
        href="https://johanibtaten.github.io/vmod-filesfolders-demo/"
        target="_blank"
        class="btn-mod"
        >Démo Vue Module 2</a
      >
    </div>
    <h2 class="pb-5 pt-1">Vue Trello</h2>
    <div class="flex flex-row items-start">
      <!-- On parcourt les colonnes du trello -->
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New column name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @mousedown.self="close">
      <router-view @close-modal="close" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardColumn from "@/components/BoardColumn";

export default {
  components: { BoardColumn },
  data() {
    return {
      newColumnName: ""
    };
  },
  computed: {
    // On récupère l'objet board depuis le state. Il contient
    // toutes les données
    ...mapState(["board"]),
    // Si le nom de la route courante est task on renvoie true
    // la modal est alors affichée sinon c'est false
    // et la modal n'est pas affichée
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "board" });
    },
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName
      });
      this.newColumnName = "";
    }
  }
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}
.other-mods {
  @apply py-5 bg-white flex justify-end mb-4;
}
.btn-mod {
  @apply p-3 mr-5 rounded text-teal-dark border border-teal-dark border-2 no-underline;
}
.task-bg {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
