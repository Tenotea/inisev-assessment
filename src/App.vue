<script setup lang="ts">
import { RouterView } from "vue-router";
import SideNavigation from "./components/navigation/side-navigation/SideNavigation.vue";
</script>

<template>
  <main class="main">
    <SideNavigation />
    <section class="main__content-area">
      <RouterView />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: flex-start;

  &__content-area {
    flex-grow: 1;
  }
}
</style>
