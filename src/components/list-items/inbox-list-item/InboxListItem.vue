<template>
  <li :class="`inbox-list-item ${opacify ? 'inbox-list-item--read' : ''}`">
    <CheckBox :checked="selected" @update:checked="onItemSelect" />
    <p
      @click="onItemView"
      :class="`inbox-list-item__title ${
        message.read && !selected ? 'inbox-list-item__title--read' : ''
      }`"
    >
      {{ message.title }}
    </p>
  </li>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { InboxItem } from "../../../types/inbox.types";
import CheckBox from "../../../components/form-controls/check-box/CheckBox.vue";

export default defineComponent({
  emits: ["select", "deselect", "view"],
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

    onItemView() {
      this.$emit("view", this.message);
    },
  },

  computed: {
    opacify() {
      return this.message.read && !this.selected;
    },
  },
});
</script>

<style lang="scss">
@import "./InboxListItem.scss";
</style>
