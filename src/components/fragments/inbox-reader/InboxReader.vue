<template>
  <section
    id="parent-exit"
    class="inbox-reader"
    @click="clickOutside($event.target as HTMLElement)"
  >
    <div id="body-exit" class="inbox-reader__content-pane">
      <div class="inbox-reader__content-area">
        <button id="btn-exit" class="inbox-reader__exit">Close (Esc)</button>
        <InboxActions
          disable-select-all
          :selected-messages="[message.id]"
          :total-message-in-view="1"
        />

        <h1 class="inbox-reader__message-title">
          {{ message.title }}
        </h1>

        <p class="inbox-reader__message-body">
          {{ message.message }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type { InboxItem } from "@/types/inbox.types";
import { defineComponent, type PropType } from "vue";
import InboxActions from "../inbox-actions/InboxActions.vue";
export default defineComponent({
  emits: ["exit"],
  props: {
    message: {
      type: Object as PropType<InboxItem>,
      required: true,
    },
  },
  components: { InboxActions },
  methods: {
    clickOutside(el: HTMLElement) {
      if (el.id.includes("exit")) {
        this.$emit("exit");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./InboxReader.scss";
</style>
