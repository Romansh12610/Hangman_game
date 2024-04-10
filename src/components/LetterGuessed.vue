<script setup lang="ts">
    const props = defineProps({
        isGuessed: {
            type: Boolean,
            default: false,
        },
        isSpace: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            required: true,
        }
    });
</script>

<template>
    <div v-if="props.isSpace" class="space"></div>
    <div v-else class="letter" :data-guessed="props.isGuessed">
        <span>{{ props.value }}</span>   
    </div>
</template>


<style scoped lang="scss">
    @use 'ut' as *;

    .space {
        padding: rem(8);
        min-width: rem(62);
        min-height: rem(80);
    }

    .letter {
        @include colFlex(center, center);
        
        background-color: var(--blue-mid);
        border-radius: rem(20);
        min-width: rem(62);
        min-height: rem(80);
        padding: rem(8);
        overflow: hidden;
        border: rem(2) solid var(--blue-dark);
        box-shadow: 0 0 5px 4px var(--blue-dark);
        
        & > span {
            display: block;
            font-size: rem(55);
            font-weight: bold;
            color: var(--white);
            transform: translateY(150%);
            transition: transform 0.5s ease-in-out;
            opacity: 0;
        }

        // letter displaying
        &[data-guessed=true] {
            & > span {
                transform: translateY(0);
                opacity: 1;
            }

            &::before {
                transform: translateY(0);
            }
        }
    }
</style>