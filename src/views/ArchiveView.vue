<template>
  <PageLayout :messages="messages" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import PageLayout from "../components/layouts/page-layout/PageLayout.vue";

export default defineComponent({
  components: {
    PageLayout,
  },

  computed: {
    ...mapGetters({
      messages: "getArchivedMessage",
    }),
  },
});
</script>
