<template>
  <aside class="side-navigation">
    <RouterLink to="/inbox">
      <button class="side-navigation__item">
        Inbox ({{ getInboxMessages.length }})
      </button>
    </RouterLink>

    <RouterLink to="/archive">
      <button class="side-navigation__item">
        Archive ({{ getArchivedMessage.length }})
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
  computed: {
    ...mapGetters(["getArchivedMessage", "getInboxMessages"]),
  },
});
</script>

<style lang="scss" scoped>
@import "./SideNavigation.scss";
</style>
