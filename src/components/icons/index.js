import Vue from "vue";

import ArrowheadUp from "./ArrowheadUp";
import ArrowheadDown from "./ArrowheadDown";
import Plus from "./Plus";
import Cross from "./Cross";

const icons = {
  IconArrowheadUp: ArrowheadUp,
  IconArrowheadDown: ArrowheadDown,
  IconPlus: Plus,
  IconCross: Cross
};

Object.entries(icons).forEach(([componentName, component]) => {
  console.log("registering", componentName);
  Vue.component(componentName, component);
});

export default icons;
