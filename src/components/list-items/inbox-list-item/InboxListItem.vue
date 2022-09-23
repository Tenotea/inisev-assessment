<template>
  <li
    :class="[
      'inbox-list-item',
      message.read && !selected ? 'inbox-list-item--read' : '',
    ]"
    @click="onItemSelect"
  >
    <CheckBox :checked="selected" />
    {{ message.title }}
  </li>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { InboxItem } from "../../../types/inbox.types";
import CheckBox from "../../../components/form-controls/check-box/CheckBox.vue";

export default defineComponent({
  emits: ["select", "deselect"],
  props: {
    message: {
      type: Object as PropType<InboxItem>,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    CheckBox,
  },

  methods: {
    onItemSelect() {
      if (!this.selected) {
        this.$emit("select", this.message.id);
      } else {
        this.$emit("deselect", this.message.id);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./InboxListItem.scss";
</style>
