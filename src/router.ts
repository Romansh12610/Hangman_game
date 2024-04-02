import { createWebHistory, createRouter } from "vue-router";
import EntryScreen from "@/views/EntryScreen.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: EntryScreen,
        }
    ],
});

export default router;