import { createWebHistory, createRouter } from "vue-router";
import EntryView from "@/views/EntryView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: EntryView,
        }
    ],
});

export default router;