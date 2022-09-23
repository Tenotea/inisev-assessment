<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :checked="checked"
      :value="checked"
      @change="handleSelect($event.target as HTMLInputElement)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["update:checked"],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleSelect(el: HTMLInputElement) {
      this.$emit("update:checked", el.checked);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./CheckBox.scss";
</style>
