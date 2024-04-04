import { createWebHistory, createRouter } from "vue-router"
import EntryView from "@/views/EntryView.vue"
import HowToPlayView from "@/views/HowToPlayView.vue"
import PickCategoryView from "@/views/PickCategoryView.vue"

export enum RoutePaths {
    ROOT = '/',
    HOW_TO_PLAY_VIEW = '/how_to',
    PICK_CATEGORY = '/pick_cat',
    PLAY_SCREEN = '/play',
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Home",
            path: RoutePaths.ROOT,
            component: EntryView,
        },
        {
            name: "How to play",
            path: RoutePaths.HOW_TO_PLAY_VIEW,
            component: HowToPlayView,
        },
        {
            name: "Pick category",
            path: RoutePaths.PICK_CATEGORY,
            component: PickCategoryView,
        },
        /* {
            name: "Play screen",
            path: RoutePaths.PLAY_SCREEN,
        } */
    ],
});

export default router;