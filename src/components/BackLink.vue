<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        href: String,
    });
</script>

<template>
    <RouterLink class="back-link" :to="props.href">
        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
        >
            <path d="M.49 8.446 8.582.361v5.21c3.118 0 9.353 2.193 9.353 10.96 0-4.743-6.235-5.689-9.353-5.57v5.57L.49 8.447Z" fill="#fff"/>
        </svg>
    </RouterLink>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .back-link {
        @include rowFlex(center, center);
        @include btn_shadow_border(8, -2);

        width: rem(80);
        height: rem(80);
        border-radius: 50%;
        border: rem(2.5) solid var(--purple-light);
        border-bottom-width: rem(10);
        transform: rotate(-35deg);

        & > svg {
            transition: transform 0.6s ease-in-out;
            transform: scale(1.8, 1.4);
        }

        &:hover {
            transform: scale(1.15);

            & > svg {
                transform: scale(1.95, 1.55) rotate(20deg);
            }
        }
    }
</style>