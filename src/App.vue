<template>
  <div id="app">
    <div id="container">
      <todo-list-switcher />
    </div>
    <portal-target name="overlay"></portal-target>
  </div>
</template>

<script>
import TodoListSwitcher from "./components/TodoListSwitcher";

export default {
  name: "App",
  components: {
    TodoListSwitcher,
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  min-height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  padding: 10px;
  min-height: 100%;
}
#container {
  margin: 0 auto;
  min-height: 100%;
  max-width: 760px;
}
</style>
