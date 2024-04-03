import { createWebHistory, createRouter } from "vue-router";
import EntryView from "@/views/EntryView.vue";
import HowToPlayView from "@/views/HowToPlayView.vue";

export enum RoutePaths {
    ROOT = '/',
    HOW_TO_PLAY_VIEW = '/howto',
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: RoutePaths.ROOT,
            component: EntryView,
        },
        {
            path: RoutePaths.HOW_TO_PLAY_VIEW,
            component: HowToPlayView,
        }
    ],
});

export default router;