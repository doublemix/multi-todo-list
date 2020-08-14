<template>
  <div class="todo-list-switcher">
    <div class="switcher-box" :class="{ 'dropdown-shown': dropdownShown }">
      <contenteditable ref="listName" tag="div" class="switcher" v-model="currentList.name" noNL/>
      <div class="dropdown-handle" @click="toggleDropdown">
        <svg width="10" height="5">
          <path v-if="!dropdownShown" d="M 0 0 L 5 5 L 10 0 Z" fill="black"></path>
          <path v-if="dropdownShown" d="M 0 5 L 5 0 L 10 5 Z" fill="black"></path>
        </svg>
      </div>
      <div v-if="dropdownShown" class="dropdown-list-container">
        <div v-click-outside="hideList" class="dropdown-list">
          <template v-for="item of todoLists">
            <div
              :key="item.id"
              class="dropdown-item"
              :class="{ 'current-dropdown-item': item.id === currentListId
            }"
              @click="currentListId = item.id; dropdownShown = false"
            >{{ item.name }}</div>
          </template>
        </div>
      </div>
      <div class="add-handle" @click="onNewList">
        <svg width="10" height="10">
          <path
            d="M 4 0 L 4 4 L 0 4 L 0 6 L 4 6 L 4 10 L 6 10 L 6 6 L 10 6 L 10 4 L 6 4 L 6 0 Z"
            fill="black"
          ></path>
        </svg>
      </div>
    </div>
    <todo-list
      v-bind="currentList"
      @new-item="onNewItem"
      @delete="onDeleteItem"
      @update="onUpdateItem"
      @move="onMoveItem"
    />
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

import TodoList from "./TodoList";

export default {
  components: {
    TodoList
  },

  directives: {
    ClickOutside
  },

  data() {
    return {
      currentListId: 0,
      todoLists: [{ id: 0, name: "Default", items: [] }],
      nextId: 1,
      dropdownShown: false,
      switching: false
    };
  },

  computed: {
    currentList() {
      return this.todoLists.find(it => it.id === this.currentListId);
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.listNameEl = this.$refs.listName.$el;
    });
  },

  methods: {
    getNextId() {
      return this.nextId++;
    },
    onNewItem(itemText) {
      this.currentList.items.unshift({ id: this.getNextId(), text: itemText });
    },
    onDeleteItem({ id }) {
      this.currentList.items = this.currentList.items.filter(
        it => it.id !== id
      );
    },
    onUpdateItem({ id, text }) {
      this.currentList.items.forEach(it => {
        if (it.id === id) {
          it.text = text;
        }
      });
    },
    onMoveItem({ id, toId }) {
      const items = this.currentList.items;
      const fromIndex = items.findIndex(it => `${it.id}` === `${id}`);
      const toIndex = items.findIndex(it => `${it.id}` === `${toId}`);
      if (toIndex !== fromIndex) {
        const item = items[fromIndex];
        items.splice(fromIndex, 1);
        items.splice(toIndex, 0, item);
      }
    },
    onNewList() {
      const newId = this.getNextId();
      this.todoLists.push({
        id: newId,
        name: `New List`,
        items: []
      });
      this.currentListId = newId;
      const listNameEl = this.$refs.listName.$el;
      this.$nextTick(() => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(listNameEl);
        selection.removeAllRanges();
        selection.addRange(range);
        listNameEl.focus();
      });
    },
    toggleDropdown() {
      this.switching = true;
      this.dropdownShown = !this.dropdownShown;
      setTimeout(() => {
        this.switching = false;
      }, 0);
    },
    hideList() {
      if (!this.switching) {
        this.dropdownShown = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles";

.switcher-box {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}

$switcher-box-border-radius: $standard-border-radius;
.switcher,
.dropdown-handle,
.add-handle {
  padding: $switcher-box-border-radius;
  border: 1px solid black;

  &:first-child {
    border-top-left-radius: $switcher-box-border-radius;
    border-bottom-left-radius: $switcher-box-border-radius;
  }
  &:not(:first-child) {
    border-left: none;
  }
  &:last-child {
    border-top-right-radius: $switcher-box-border-radius;
    border-bottom-right-radius: $switcher-box-border-radius;
  }
  .dropdown-shown & {
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
}
.switcher {
  flex: 1;
}
.dropdown-handle {
  min-width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.add-handle {
  min-width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-list-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
}
.dropdown-list {
  border: 1px solid black;
  border-top: none;
  border-bottom-left-radius: $switcher-box-border-radius;
  border-bottom-right-radius: $switcher-box-border-radius;
  background: white;
}
.dropdown-item {
  padding: 10px;

  &.current-dropdown-item {
    background: rgb(209, 225, 243);
  }
  &:hover:not(.current-dropdown-item) {
    background: #CCC;
  }
}
</style>
