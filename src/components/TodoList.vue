<template>
  <div class="todo-list">
    <contenteditable
      tag="div"
      class="input"
      contenteditable
      type="text"
      v-model="newText"
      noNL
      noHTML
      @keydown.enter="submit"
    ></contenteditable>
    <ul>
      <todo-list-item
        v-for="item of items"
        :key="item.id"
        v-bind="item"
        @delete="deleteItem"
        @update="updateItem"
      />
    </ul>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";

export default {
  components: {
    TodoListItem
  },

  filters: {
    json: it => JSON.stringify(it)
  },

  props: ["items"],

  data() {
    return {
      newText: ""
    };
  },

  methods: {
    submit() {
      this.$emit("new-item", this.newText);
      this.newText = "";
    },
    deleteItem(arg) {
      this.$emit("delete", arg);
    },
    updateItem(arg) {
      this.$emit("update", arg);
    },
    onUpdate(event) {
      this.newText = event.target.innerText;
      console.log(document.getSelection().toString());
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles";

.input {
  border: 1px solid black;
  border-radius: $standard-border-radius;
  margin: 5px 0;
  padding: $standard-border-radius;
  white-space: pre;
}
</style>