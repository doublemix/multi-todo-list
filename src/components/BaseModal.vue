<template>
  <portal v-if="value" to="overlay">
    <div class="overlay" @click.self="close">
      <div class="modal" :style="{ width: maxWidth }">
        <slot></slot>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  props: {
    value: Boolean,
    maxWidth: {
      type: String,
      default: "500px",
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 1000;
  background: #0006;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal {
  padding: 10px;
}
</style>