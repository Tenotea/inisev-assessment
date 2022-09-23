<template>
  <section class="inbox">
    <div class="inbox__heading">
      <h5 class="inbox__title--primary">Inbox</h5>
      <h1 class="inbox__title--secondary">
        Emails Selected
        {{ selectedMessages.length > 0 ? `(${selectedMessages.length})` : "" }}
      </h1>
    </div>

    <div class="inbox__actions-container">
      <CheckBox
        @update:checked="selectAllMessage"
        :checked="selectedMessages.length === messages.length"
      />
      <BaseButton
        @click="
          markMessagesAsRead({ selectedMessages }), (selectedMessages = [])
        "
      >
        Mark as read (r)
      </BaseButton>
      <BaseButton
        @click="archiveMessages({ selectedMessages }), (selectedMessages = [])"
      >
        Archive (a)
      </BaseButton>
    </div>

    <ul class="inbox__items-list">
      <InboxListItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :selected="selectedMessages.includes(message.id)"
        @select="handleInboxSelect"
        @deselect="handleInboxDeselect"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import CheckBox from "../../components/form-controls/check-box/CheckBox.vue";
import BaseButton from "../../components/buttons/base-button/BaseButton.vue";
import InboxListItem from "../../components/list-items/inbox-list-item/InboxListItem.vue";
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import type { InboxItem } from "@/types/inbox.types";

export default defineComponent({
  components: {
    CheckBox,
    BaseButton,
    InboxListItem,
  },

  data() {
    return {
      selectedMessages: [] as number[],
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
  },

  computed: {
    ...mapState({
      messages: (state: any) =>
        state.messages.filter((message: InboxItem) => !message.archived),
    }),
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
