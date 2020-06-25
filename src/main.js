import Vue from "vue";
import ClickOutside from "vue-click-outside";
import App from "./App.vue";

import contenteditable from "vue-contenteditable";

Vue.config.productionTip = false;

Vue.use(contenteditable);
Vue.directive("click-outside", ClickOutside);

new Vue({
  render: h => h(App)
}).$mount("#app");
