<script setup lang="ts">
    import LinkUnderlined from './LinkUnderlined.vue';

    const props = defineProps({
        parText: String,
        linkText: String,
        href: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <div class="error">
        <p>{{ props.parText }}</p>
        <LinkUnderlined :text="props.linkText" :href="props.href" />
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;

    .error {
        @include colFlex(center, center, rem(15));

        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: rem(350);
        height: rem(150);
        background-color: var(--pink);
        border-radius: rem(32);

        > p {
            font-size: rem(40);
        }

        > a {
            font-size: rem(32);
            transition: transform 0.4 ease-in-out;
        }
    }
</style>