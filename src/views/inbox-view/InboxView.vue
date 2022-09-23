<template>
  <section class="inbox">
    <div class="inbox__heading">
      <h5 class="inbox__title--primary">Inbox</h5>
      <h1 class="inbox__title--secondary">Emails Selected (2)</h1>
    </div>

    <div class="inbox__actions-container">
      <CheckBox
        @update:checked="selectAllMessage"
        :checked="selectedMessages.length === messages.length"
      />
      <BaseButton> Mark as read (r) </BaseButton>
      <BaseButton> Archive (a) </BaseButton>
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
import { inboxMessages } from "../../utils/inbox.utils";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CheckBox,
    BaseButton,
    InboxListItem,
  },

  data() {
    return {
      selectedMessages: [] as number[],
      messages: inboxMessages,
    };
  },

  methods: {
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
        this.selectedMessages = this.messages.map((message) => message.id);
      } else {
        this.selectedMessages = [];
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./InboxView.scss";
</style>
