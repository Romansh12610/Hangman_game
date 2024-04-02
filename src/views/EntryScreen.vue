<script setup lang="ts">
    import MenuModal from '@/components/MenuModal.vue';
    import Logo from '@/components/images/Logo.vue'
    import { reactive } from 'vue'

    const logoScalars = reactive({
        x: 1.1,
        y: 1.1,
    })
</script>

<template>
    <MenuModal>
        <Logo :scale-x="logoScalars.x" :scale-y="logoScalars.y" />
    </MenuModal>
</template>

<style scoped lang="scss"></style>
