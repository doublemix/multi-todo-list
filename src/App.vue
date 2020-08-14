<template>
  <div id="app">
    <todo-list-switcher/>
  </div>
</template>

<script>
import TodoListSwitcher from "./components/TodoListSwitcher";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    TodoListSwitcher
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
