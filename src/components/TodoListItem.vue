<template>
  <div class="todo-list-item">
    <contenteditable tag="div" type="text" :value="text" @input="updateItem" noNL noHTML></contenteditable>
    <div class="delete-item-container" @click="deleteItem">
      <svg width="10" height="10">
        <path d="M 0 2 L 8 10 L 10 8 L 2 0 Z M 0 8 L 2 10 L 10 2 L 8 0 Z"></path>
      </svg>
    </div>
  </div>
</template>

<style>
.todo-list-item {
  display: list-item;
  position: relative;
  padding-right: 20px;
}
.delete-item-container {
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.delete-item {
  width: 10px;
  height: 10px;
  background: red;
}
</style>

<script>
export default {
  props: ["id", "text"],
  data() {
    return {
      workingText: this.text
    };
  },
  methods: {
    deleteItem() {
      this.$emit("delete", { id: this.id });
    },
    updateItem(newText) {
      this.$emit("update", { id: this.id, text: newText });
    }
  }
};
</script>

