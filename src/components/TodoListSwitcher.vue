<template>
  <div class="todo-list-switcher">
    <div
      class="switcher-box"
      :class="{ 'dropdown-shown': dropdownShown, 'none-selected': currentList == null }"
    >
      <contenteditable
        v-if="currentList"
        ref="listName"
        tag="div"
        class="switcher"
        v-model="currentListName"
        noNL
      />
      <div class="switcher" v-else>Create or Select a List</div>
      <div class="dropdown-handle" @click="toggleDropdown">
        <icon-arrowhead-down v-if="!dropdownShown"/>
        <icon-arrowhead-up v-if="dropdownShown"/>
      </div>
      <div v-if="dropdownShown" class="dropdown-list-container">
        <div v-click-outside="hideList" class="dropdown-list">
          <template v-for="item of sortedItemLists">
            <div
              :key="item.id"
              class="dropdown-item"
              :class="{ 'current-dropdown-item': item.id === currentListId
            }"
              @click="onClickList(item.id)"
            >{{ item.name }}</div>
          </template>
        </div>
      </div>
      <div class="add-handle" @click="onNewList">
        <icon-plus/>
      </div>
      <div class="delete-handle" :disabled="currentList == null" @click="onDeleteList">
        <icon-times/>
      </div>
    </div>
    <todo-list v-if="currentList" :id="currentList.id"/>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapActions, mapGetters } from "vuex";
import sortBy from "lodash/sortBy";

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
      dropdownShown: false,
      switching: false
    };
  },

  computed: {
    ...mapGetters(["currentList", "itemLists"]),

    sortedItemLists() {
      return sortBy(this.itemLists, it => it.name.toLowerCase());
    },

    currentListName: {
      get() {
        return this.currentList.name;
      },
      set(newValue) {
        this.updateListName({ listId: this.currentList.id, name: newValue });
      }
    },
    currentListId() {
      if (this.currentList) {
        return this.currentList.id;
      }
      return null;
    }
  },

  methods: {
    ...mapActions(["addList", "deleteList", "updateListName", "switchToList"]),
    async onNewList() {
      const listId = await this.addList();
      this.switchToList({ listId });

      this.$nextTick(() => {
        const listNameEl = this.$refs.listName.$el;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(listNameEl);
        selection.removeAllRanges();
        selection.addRange(range);
        listNameEl.focus();
      });
    },
    onDeleteList() {
      if (this.currentList == null) {
        return;
      }
      this.deleteList({ listId: this.currentList.id });
      this.switchToList({ listId: null });
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
    },
    onClickList(listId) {
      this.switchToList({ listId });
      this.dropdownShown = false;
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
.add-handle,
.delete-handle {
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
.switcher-box.none-selected {
  background: #EEE;
}
.dropdown-handle,
.add-handle,
.delete-handle {
  min-width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  &[disabled] {
    color: grey;
    fill: grey;
  }
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
