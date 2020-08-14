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
        :key="item"
        :id="item"
        draggable
        @delete="onDeleteItem"
        @move="onMoveItem"
      />
    </ul>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TodoListItem
  },

  filters: {
    json: it => JSON.stringify(it)
  },

  props: ["id"],

  data() {
    return {
      newText: ""
    };
  },

  computed: {
    ...mapGetters(["getItemList"]),

    list() {
      return this.getItemList(this.id);
    },
    items() {
      return this.list.items;
    }
  },

  methods: {
    ...mapActions(["addItemToList", "deleteItemFromList", "moveItemInList"]),
    submit() {
      this.addItemToList({ listId: this.id, text: this.newText });
      this.newText = "";
    },
    onDeleteItem({ id: itemId }) {
      this.deleteItemFromList({ listId: this.id, itemId });
    },
    onMoveItem({ id: itemId, toId: toItemId }) {
      this.moveItemInList({ listId: this.id, itemId, toItemId });
    },
    onUpdate(event) {
      this.newText = event.target.innerText;
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