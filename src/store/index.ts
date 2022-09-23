import { inboxMessages } from "@/utils/inbox.utils";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      messages: inboxMessages,
    };
  },

  getters: {
    getArchivedMessage(state) {
      return state.messages.filter((message) => message.archived);
    },

    getInboxMessages(state) {
      return state.messages.filter((message) => !message.archived);
    },
  },

  mutations: {
    markMessagesAsRead(state, payload) {
      state.messages = state.messages.map((message) => {
        if (payload.selectedMessages.includes(message.id)) {
          return {
            ...message,
            read: true,
          };
        } else {
          return message;
        }
      });
    },

    archiveMessages(state, payload) {
      state.messages = state.messages.map((message) => {
        if (payload.selectedMessages.includes(message.id)) {
          return {
            ...message,
            archived: true,
          };
        } else {
          return message;
        }
      });
    },
  },
});

export default store;
