<template>
  <li>
    <div
      class="todo-list-item"
      draggable
      @dragstart="startDragging"
      @dragover="acceptDrag"
      @drop="handleDrop"
    >
      <div class="item-action prefix">
        <input type="checkbox" v-model="completed">
      </div>
      <contenteditable class="editor" tag="div" type="text" v-model="text" noNL noHTML></contenteditable>
      <div class="item-action delete-item-action" @click="onDeleteItem">
        <icon-times/>
      </div>
    </div>
  </li>
</template>

<style lang="scss">
li {
  $separatorStyle: 1px solid #DDD;
  &:first-child {
    border-top: $separatorStyle;
  }
  border-bottom: $separatorStyle;
}
.todo-list-item {
  display: flex;
  flex-flow: row nowrap;

  &:hover {
    background: #CCE;
  }
}
.editor {
  flex: 1;
}
.item-action {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  $margin: 10px;
  &:not(.prefix) {
    margin-left: $margin;
  }
  &.prefix {
    margin-right: $margin;
  }

  svg {
    margin: 3px;
  }
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
    completed: {
      get() {
        return this.item.completed || false;
      },
      set(newValue) {
        this.updateItemCompleted({ itemId: this.id, completed: newValue });
      }
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
    ...mapActions(["updateItemText", "updateItemCompleted"]),

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

