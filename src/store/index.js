import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  nextId: 0,
  currentListId: null,
  itemLists: {},
  items: {}
};

const mutations = {
  INCREMENT_NEXT_ID(state) {
    state.nextId++;
  },
  SET_CURRENT_LIST_ID(state, { listId }) {
    state.currentListId = listId;
  },
  SET_LIST(state, { listId, list }) {
    Vue.set(state.itemLists, listId, list);
  },
  SET_LIST_NAME(state, { listId, name }) {
    state.itemLists[listId].name = name;
  },
  INSERT_ITEM_INTO_LIST(state, { listId, index = 0, itemId }) {
    const list = state.itemLists[listId];
    list.items.splice(index, 0, itemId);
  },
  MOVE_ITEM_IN_LIST(state, { listId, fromIndex, toIndex }) {
    const list = state.itemLists[listId];
    const items = list.items;
    const [value] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, value);
  },
  REMOVE_ITEM_FROM_LIST(state, { listId, itemId }) {
    const list = state.itemLists[listId];
    list.items = list.items.filter((id) => id !== itemId);
  },
  SET_ITEM(state, { itemId, item }) {
    Vue.set(state.items, itemId, item);
  },
  UPDATE_ITEM_TEXT(state, { itemId, text }) {
    const item = state.items[itemId];
    item.text = text;
  },
  DELETE_ITEM(state, { itemId }) {
    Vue.delete(state.items, itemId);
  }
};

const getters = {
  currentList(state, getters) {
    return getters.getItemList(state.currentListId);
  },
  itemLists(state) {
    return Object.values(state.itemLists);
  },
  getItemList(state) {
    return (id) => {
      return state.itemLists[id] || null;
    };
  },
  getItem(state) {
    return (id) => {
      return state.items[id] || null;
    };
  }
};

const actions = {
  getNextId({ commit, state }) {
    const id = state.nextId;
    commit("INCREMENT_NEXT_ID");
    return id;
  },

  async addList({ commit, dispatch }, { name = "New List" } = {}) {
    const id = await dispatch("getNextId");
    const newList = { id, name, items: [] };
    commit("SET_LIST", { listId: id, list: newList });
    return id;
  },

  updateListName({ commit }, { listId, name }) {
    commit("SET_LIST_NAME", { listId, name });
  },

  async addItemToList({ commit, dispatch }, { listId, text }) {
    const id = await dispatch("getNextId");
    const newItem = { id, text };
    commit("SET_ITEM", { itemId: id, item: newItem });
    commit("INSERT_ITEM_INTO_LIST", { listId, itemId: id });
    return id;
  },

  deleteItemFromList({ commit }, { listId, itemId, deleteItem = true }) {
    commit("REMOVE_ITEM_FROM_LIST", { listId, itemId });
    if (deleteItem) {
      commit("DELETE_ITEM", { itemId });
    }
  },

  updateItemText({ commit }, { itemId, text }) {
    commit("UPDATE_ITEM_TEXT", { itemId, text });
  },

  moveItemInList({ commit, getters }, { listId, itemId, toItemId }) {
    const list = getters.getItemList(listId);
    const items = list.items;
    const fromIndex = items.findIndex((it) => it === itemId);
    const toIndex = items.findIndex((it) => it === toItemId);
    commit("MOVE_ITEM_IN_LIST", { listId, fromIndex, toIndex });
  },

  switchToList({ commit }, { listId }) {
    commit("SET_CURRENT_LIST_ID", { listId });
  }
};

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "@multi-todo-list"
    })
  ],
  state,
  mutations,
  getters,
  actions
});
