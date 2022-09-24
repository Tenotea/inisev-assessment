<template>
  <div class="inbox-actions">
    <CheckBox
      v-if="!disableSelectAll"
      @update:checked="$emit('select:all')"
      :checked="selectedMessages.length === totalMessageInView"
    />
    <BaseButton
      @click="
        markMessagesAsRead({ selectedMessages }), $emit('clear:selection')
      "
    >
      Mark as read (r)
    </BaseButton>
    <BaseButton
      @click="archiveMessages({ selectedMessages }), $emit('clear:selection')"
    >
      Archive (a)
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { mapMutations } from "vuex";
import BaseButton from "../../buttons/base-button/BaseButton.vue";
import CheckBox from "../../form-controls/check-box/CheckBox.vue";

export default defineComponent({
  emits: ["select:all", "clear:selection"],
  props: {
    disableSelectAll: {
      type: Boolean,
      default: false,
    },
    selectedMessages: {
      type: Array as PropType<number[]>,
      required: true,
    },
    totalMessageInView: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["markMessagesAsRead", "archiveMessages"]),
  },
  components: { BaseButton, CheckBox },
});
</script>

<style lang="scss" scoped>
@import "./InboxActions.scss";
</style>
