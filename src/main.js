import Vue from "vue";
import ClickOutside from "vue-click-outside";
import PortalVue from "portal-vue";
import contenteditable from "vue-contenteditable";

import App from "./App.vue";
import store from "./store";
import "./components/icons"; // make all icons available!

Vue.config.productionTip = false;

Vue.use(contenteditable);
Vue.directive("click-outside", ClickOutside);
Vue.use(PortalVue);

Vue.filter("json", (it, spaces) => JSON.stringify(it, undefined, spaces));

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
