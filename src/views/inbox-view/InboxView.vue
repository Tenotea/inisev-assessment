<template>
  <section class="inbox">
    <div class="inbox__heading">
      <h5 class="inbox__title--primary">Inbox</h5>
      <h1 class="inbox__title--secondary">
        Emails Selected
        {{ selectedMessages.length > 0 ? `(${selectedMessages.length})` : "" }}
      </h1>
    </div>

    <InboxActions
      :selected-messages="selectedMessages"
      :total-message-in-view="getInboxMessages.length"
      @clear:selection="selectedMessages = []"
      @select:all="selectAllMessage"
    />

    <ul class="inbox__items-list">
      <InboxListItem
        v-for="message in getInboxMessages"
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
import InboxListItem from "../../components/list-items/inbox-list-item/InboxListItem.vue";
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import type { InboxItem } from "@/types/inbox.types";
import InboxReader from "../../components/fragments/inbox-reader/InboxReader.vue";
import InboxActions from "../../components/fragments/inbox-actions/InboxActions.vue";

export default defineComponent({
  components: {
    InboxListItem,
    InboxReader,
    InboxActions,
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
        this.selectedMessages = this.getInboxMessages.map(
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

  computed: {
    ...mapGetters(["getInboxMessages"]),
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
@import "./InboxView.scss";
</style>
