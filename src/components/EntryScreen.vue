<script setup lang="ts">
    import { reactive } from 'vue';
    import Logo from './images/Logo.vue';
    
    const logoScalars = reactive({
        x: 1.1,
        y: 1.1,
    });
</script>

<template>
    <div class="entry__container">
        <Logo :scale-x="logoScalars.x" :scale-y="logoScalars.y" />
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .entry__container {
        @include colFlex(center);

        width: rem(650);
        height: rem(480);
        margin-top: 25vh;
        color: #fff;
        background: linear-gradient(to bottom, var(--blue-mid-op), var(--blue-dark-op));
        border-radius: rem(50);
        box-shadow: inset 0 rem(10) 0 rem(5) var(--blue-light);
        position: relative;
        border: rem(3) solid var(--blue-dark);
        border-bottom-width: rem(10);
    }
</style>
