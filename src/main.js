import Vue from "vue";
import ClickOutside from "vue-click-outside";
import App from "./App.vue";
import store from "./store";

import contenteditable from "vue-contenteditable";

Vue.config.productionTip = false;

Vue.use(contenteditable);
Vue.directive("click-outside", ClickOutside);

Vue.filter("json", (it) => JSON.stringify(it));

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
