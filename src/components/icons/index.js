import Vue from "vue";

import ArrowheadUp from "./ArrowheadUp";
import ArrowheadDown from "./ArrowheadDown";
import Plus from "./Plus";
import Times from "./Times";

const icons = {
  IconArrowheadUp: ArrowheadUp,
  IconArrowheadDown: ArrowheadDown,
  IconPlus: Plus,
  IconTimes: Times
};

Object.entries(icons).forEach(([componentName, component]) => {
  console.log("registering", componentName);
  Vue.component(componentName, component);
});

export default icons;
