<script setup lang="ts">
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        btnText: String,
        big: Boolean,
        href: String,
    });

    const btnMode = computed(() => props.big ? 'large' : 'small');

</script>

<template>
    <RouterLink class="btn" :data-mode="btnMode" :to="href">
        <p class="btn__text">{{ props.btnText }}</p>
    </RouterLink>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .btn {
        @include rowFlex(center, center);
        @include fontDefault;

        min-width: fit-content;
        min-height: fit-content;
        border: rem(2.5) solid var(--blue-dark);
        background-color: var(--blue-light);
        transition: box-shadow 0.4s ease-in-out;

        & > .btn__text {
            @include fontDefault;
            text-transform: uppercase;
            color: var(--white);

            transition: transform 0.4s ease-in-out;
        }

        // small mode
        &[data-mode=small] {
            padding: 0.25em 1em;
            border-radius: rem(25);
            border-bottom-width: rem(8);
            box-shadow: inset 3px 8px 4px 2px var(--cyan);

            & > .btn__text {
                font-size: rem(30);
            }

            // hover
            &:hover {
                box-shadow: inset -8px -3px 4px 2px var(--cyan);

                & > .btn__text {
                    transform: skew(-15deg) scale(1.05);
                }
            }
        }

        // large mode
        &[data-mode=large] {
            padding: 1.25em 1.5em;
            border-radius: rem(35);

            & > .btn__text {
                font-size: rem(45);
            }
        }
    }
</style>