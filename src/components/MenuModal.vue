<script setup lang="ts">
</script>

<template>
    <div class="modal__container">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .modal__container {
        @include colFlex(center);

        width: rem(650);
        height: rem(480);
        margin-top: 25vh;
        background: linear-gradient(to bottom, var(--blue-mid-op), var(--blue-dark-op));
        border-radius: rem(50);
        box-shadow: inset 0 rem(10) 0 rem(5) var(--blue-light);
        position: relative;
        border: rem(3) solid var(--blue-dark);
        border-bottom-width: rem(10);
    }
</style>
