import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  nextId: 0,
  currentListId: null,
  itemLists: {},
  items: {}
};

const mutations = {};

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
  getNextId({ state }) {
    const id = state.nextId++;
    return id;
  },

  async addList({ state, dispatch }, { name = "New List" } = {}) {
    const id = await dispatch("getNextId");
    const newList = { id, name, items: [] };
    Vue.set(state.itemLists, id, newList);
    return id;
  },

  updateListName({ getters }, { listId, name }) {
    const list = getters.getItemList(listId);
    list.name = name;
  },

  async addItemToList({ state, dispatch, getters }, { listId, text }) {
    const id = await dispatch("getNextId");
    const list = getters.getItemList(listId);
    const newItem = { id, text };
    list.items.unshift(id);
    Vue.set(state.items, id, newItem);
    return id;
  },

  deleteItemFromList({ state, getters }, { listId, itemId }) {
    const list = getters.getItemList(listId);
    list.items = list.items.filter((it) => it !== itemId);
    Vue.delete(state.items, itemId);
  },

  updateItemText({ getters }, { itemId, text }) {
    const item = getters.getItem(itemId);
    item.text = text;
  },

  moveItemInList({ getters }, { listId, itemId, toItemId }) {
    const list = getters.getItemList(listId);
    const items = list.items;
    const fromIndex = items.findIndex((it) => `${it}` === `${itemId}`);
    const toIndex = items.findIndex((it) => `${it}` === `${toItemId}`);
    if (fromIndex === toIndex) return;
    items.splice(fromIndex, 1);
    items.splice(toIndex, 0, itemId);
  },

  switchToList({ state }, { listId }) {
    state.currentListId = listId;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
