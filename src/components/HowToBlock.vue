<script setup lang="ts">

    const props = defineProps({
        number: String,
        title: String,
        description: String,
    });

</script>

<template>
    <article class="wrapper">
        <p class="wrapper__number">{{ props.number }}</p>
        <h3 class="wrapper__title">{{ props.title }}</h3>
        <p class="wrapper__description">{{ props.description }}</p>
    </article>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .wrapper {
        @include colFlex(center, flex-start);
        @include fontDefault();

        border: rem(8) solid var(--blue-dark);
        border-radius: rem(35);
        padding: rem(20) rem(40) rem(35);
        background-color: var(--white);

        &__number {
            font-size: rem(86);
            text-transform: uppercase;
            color: var(--blue-light);
        }

        &__title {
            white-space: nowrap;
            font-size: rem(46);
            font-weight: 400;
            text-transform: uppercase;
            color: var(--block-title);
            margin-bottom: rem(12);
        }

        &__description {
            font-size: rem(22);
            color: var(--block-desc);
            text-align: center;
        }
    }
</style>