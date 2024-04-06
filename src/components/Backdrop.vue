<script setup lang="ts">

    function handleBackdropClick(e: MouseEvent) {
        const target = (e.target as HTMLElement).closest("#backdrop");
        if (!target) return;
        
        // stop click propagation
        e.stopImmediatePropagation();
    }
</script>

<template>
    <div id="backdrop" @click.capture="handleBackdropClick"></div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    #backdrop {
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--backdrop-black);
    }
</style>