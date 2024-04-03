import { createWebHistory, createRouter } from "vue-router";
import EntryView from "@/views/EntryView.vue";
import HowToPlayView from "@/views/HowToPlayView.vue";
import PickCategoryView from "@/views/PickCategoryView.vue";

export enum RoutePaths {
    ROOT = '/',
    HOW_TO_PLAY_VIEW = '/how_to',
    PICK_CATEGORY = '/pick_cat',
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
        },
        {
            path: RoutePaths.PICK_CATEGORY,
            component: PickCategoryView,
        }
    ],
});

export default router;