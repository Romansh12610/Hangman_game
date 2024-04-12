<script setup lang="ts">
    import { computed } from 'vue'
    import { RouterLink } from 'vue-router'

    const props = defineProps({
        btnText: String,
        big: Boolean,
        href: {
            type: String,
            required: true,
        },
        // for styles
        isQuitBtn: Boolean,
    })

    const emits = defineEmits(['restart'])
    const btnMode = computed(() => (props.big ? 'large' : 'small'))
</script>

<template>
    <RouterLink
        class="btn"
        :data-mode="btnMode"
        :data-quit="props.isQuitBtn"
        :to="href"
        @click="$emit('restart')"
    >
        <p class="btn__text">{{ props.btnText }}</p>
    </RouterLink>
    <!-- if need restart game -->
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
        z-index: 10;

        & > .btn__text {
            @include fontDefault;
            text-transform: uppercase;
            color: var(--white);

            transition: transform 0.4s ease-in-out;
        }

        // for quit btn
        &[data-quit='true'] > .btn__text {
            color: var(--blue-dark);
        }

        // small mode
        &[data-mode='small'] {
            @include btn_shadow_border(5, 5, --blue-light, --pink);
            // for quit btn
            &[data-quit='true'] {
                @include btn_shadow_border(5, 5, --pink, --blue-light-op);
            }

            padding: 0.25em 1em;
            border-radius: rem(25);
            & > .btn__text {
                font-size: rem(30);
            }

            // hover
            &:hover {
                & > .btn__text {
                    transform: skew(-15deg) scale(1.05);
                }
            }
        }

        // large mode
        &[data-mode='large'] {
            @include btn_shadow_border(15, 8, --blue-light, --pink);

            padding: 1.25em 1.5em;
            border-radius: rem(35);

            & > .btn__text {
                font-size: rem(45);
            }
        }
    }
</style>
