<template>
  <div class="todo-list-switcher">
    <div class="switcher-box">
      <contenteditable tag="div" class="switcher" v-model="currentList.name"/>
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

  methods: {
    getNextId() {
      return this.nextId++;
    },
    onNewItem(itemText) {
      this.currentList.items.push({ id: this.getNextId(), text: itemText });
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
    onNewList() {
      const newId = this.getNextId();
      this.todoLists.push({
        id: newId,
        name: `New List #${newId}`,
        items: []
      });
      this.currentListId = newId;
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
.switcher-box {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}
.switcher,
.dropdown-handle,
.add-handle {
  padding: 3px;
  border: 1px solid black;

  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &:not(:first-child) {
    border-left: none;
  }
  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
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
  padding-top: 10px;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
}
.dropdown-list {
  border: 1px solid black;
  border-radius: 3px;
  background: white;
  box-shadow: 0px 0px 3px black;
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
