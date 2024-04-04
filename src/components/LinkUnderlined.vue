<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        text: String,
        href: String,
    });
</script>

<template>
    <RouterLink :to="props.href" class="link">
        {{ props.text }}
    </RouterLink>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .link {
        font-size: rem(32);
        color: var(--purple);
        position: relative;
        overflow: hidden;
        line-height: 1.4;
        transition: color 0.4s ease-in-out;

        &::before {
            content: '';
            display: block;
            position: absolute;
            bottom: 0.5px;
            left: 0;
            height: rem(4);
            width: 0;
            transition: width 0.4s ease-in-out, background-color 0.4s ease-in-out;
            background-color: var(--purple);
            border-radius: rem(15);
        }

        &:hover {
            color: var(--cyan);
            &::before {
                width: 100%;
                background-color: var(--cyan);
            }
        }
    }
</style>