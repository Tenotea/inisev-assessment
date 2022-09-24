<template>
  <section class="inbox">
    <div class="inbox__heading">
      <h5 class="inbox__title--primary">{{ $route.name }}</h5>
      <h1 class="inbox__title--secondary">
        Emails Selected
        {{ selectedMessages.length > 0 ? `(${selectedMessages.length})` : "" }}
      </h1>
    </div>

    <InboxActions
      :selected-messages="selectedMessages"
      :total-message-in-view="messages.length"
      @clear:selection="selectedMessages = []"
      @select:all="selectAllMessage"
    />

    <ul class="inbox__items-list">
      <InboxListItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :selected="selectedMessages.includes(message.id)"
        @select="handleInboxSelect"
        @deselect="handleInboxDeselect"
        @view="viewMessage"
      />
    </ul>

    <InboxReader
      v-if="messageInView"
      :message="messageInView"
      @exit="messageInView = null"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { mapMutations } from "vuex";
import type { InboxItem } from "@/types/inbox.types";
import InboxActions from "../../fragments/inbox-actions/InboxActions.vue";
import InboxListItem from "../../list-items/inbox-list-item/InboxListItem.vue";
import InboxReader from "../../fragments/inbox-reader/InboxReader.vue";

export default defineComponent({
  props: {
    messages: {
      type: Array as PropType<InboxItem[]>,
      required: true,
    },
  },

  components: {
    InboxActions,
    InboxListItem,
    InboxReader,
  },

  data() {
    return {
      selectedMessages: [] as number[],
      messageInView: null as InboxItem | null,
    };
  },

  methods: {
    ...mapMutations(["markMessagesAsRead", "archiveMessages"]),
    handleInboxSelect(inboxId: number) {
      this.selectedMessages.push(inboxId);
    },

    handleInboxDeselect(inboxId: number) {
      this.selectedMessages = this.selectedMessages.filter(
        (message) => message !== inboxId
      );
    },

    selectAllMessage(checked: boolean) {
      if (checked) {
        this.selectedMessages = this.messages.map(
          (message: InboxItem) => message.id
        );
      } else {
        this.selectedMessages = [];
      }
    },

    viewMessage(message: InboxItem) {
      this.messageInView = message;
    },
  },

  mounted() {
    window.addEventListener("keypress", (e) => {
      if (e.key === "a" && this.selectedMessages.length > 0) {
        this.archiveMessages({ selectedMessages: this.selectedMessages });
        this.selectedMessages = [];
      }

      if (e.key === "r" && this.selectedMessages.length > 0) {
        this.markMessagesAsRead({ selectedMessages: this.selectedMessages });
        this.selectedMessages = [];
      }
    });
  },
});
</script>

<style lang="scss" scoped>
@import "./PageLayout.scss";
</style>
