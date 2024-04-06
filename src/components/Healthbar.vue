<script setup lang="ts">
    import HeartIcon from './images/HeartIcon.vue';
</script>

<template>
    <div class="bar">
        <div class="bar__track">
            <div></div>
        </div>
        <HeartIcon />
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .bar {
        @include rowFlex(center, center, rem(20));

        &__track {
            background-color: var(--white);
        }
    }
</style>