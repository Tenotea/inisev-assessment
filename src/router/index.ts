import { createRouter, createWebHistory } from "vue-router";
import InboxView from "../views/inbox-view/InboxView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/inbox",
    },
    {
      path: "/inbox",
      name: "inbox",
      component: InboxView,
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("../views/archive-view/ArchiveView.vue"),
    },
  ],
});

export default router;
