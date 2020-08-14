<template>
  <div id="app">
    <todo-list-switcher v-if="currentList"/>
  </div>
</template>

<script>
import TodoListSwitcher from "./components/TodoListSwitcher";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    TodoListSwitcher
  },
  computed: {
    ...mapGetters(["currentList"])
  },
  methods: {
    ...mapActions(["addList", "switchToList"])
  },
  async mounted() {
    if (this.currentList == null) {
      const id = await this.addList({ name: "Default" });
      this.switchToList({ listId: id });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
