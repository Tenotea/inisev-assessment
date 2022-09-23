<template>
  <aside class="side-navigation">
    <RouterLink to="/inbox">
      <button class="side-navigation__item">Inbox ({{ inboxMessages }})</button>
    </RouterLink>

    <RouterLink to="/archive">
      <button class="side-navigation__item">
        Archive ({{ archivedMessages }})
      </button>
    </RouterLink>

    <button class="side-navigation__item side-navigation__item--bottom">
      Logout
    </button>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  methods: {
    ...mapGetters(["getArchivedMessage", "getInboxMessages"]),
  },

  computed: {
    inboxMessages() {
      return this.getInboxMessages().length;
    },

    archivedMessages() {
      return this.getArchivedMessage().length;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./SideNavigation.scss";
</style>
