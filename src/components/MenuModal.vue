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

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: rem(650);
        height: rem(480);
        background: linear-gradient(to bottom, var(--blue-mid-op), var(--blue-dark-op));
        border-radius: rem(50);
        box-shadow: inset 0 rem(10) 0 rem(5) var(--blue-light);
        border: rem(3) solid var(--blue-dark);
        border-bottom-width: rem(10);
        z-index: 100;
    }
</style>
