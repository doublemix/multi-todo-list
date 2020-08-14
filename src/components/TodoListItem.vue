<template>
  <div
    class="todo-list-item"
    draggable
    @dragstart="startDragging"
    @dragover="acceptDrag"
    @drop="handleDrop"
  >
    <contenteditable tag="div" type="text" v-model="text" noNL noHTML></contenteditable>
    <div class="delete-item-container" @click="onDeleteItem">
      <icon-cross/>
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
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["id"],

  computed: {
    ...mapGetters(["getItem"]),

    item() {
      return this.getItem(this.id);
    },
    text: {
      get() {
        return this.item.text;
      },
      set(newValue) {
        this.updateItemText({ itemId: this.id, text: newValue });
      }
    }
  },

  methods: {
    ...mapActions(["updateItemText"]),

    onDeleteItem() {
      this.$emit("delete", { id: this.id });
    },

    startDragging(event) {
      event.dataTransfer.setData("type", "list-item-move");
      event.dataTransfer.setData("itemId", this.id);
    },
    acceptDrag(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      if (event.dataTransfer.getData("type") === "list-item-move") {
        const droppedItemId = +event.dataTransfer.getData("itemId");
        this.$emit("move", { id: droppedItemId, toId: this.id });
      }
    }
  }
};
</script>

