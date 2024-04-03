
<template>
    <div class="spinner">
        <span>Loading...</span>
    </div>
</template>

<style scoped lang="scss">
    @use 'ut' as *;
    .spinner {
        width: rem(250);
        height: rem(250);
        border: rem(15) solid var(--pink);
        border-bottom-width: rem(2);
        border-top-width: rem(2);

        border-radius: 50%;
        background-color: transparent;
        position: fixed;
        top: 50%;
        left: 50%;

        animation: spin 12s infinite forwards linear;

        @keyframes spin {
            from {
                transform: translate(-50%, -50%) rotate(-360deg);
                border-bottom-width: rem(2);
                border-top-width: rem(2);
            }

            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        & > span {
            @include fontDefault(48);
            line-height: 0;
            letter-spacing: rem(3.2);
            color: var(--white);

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
        }
    }
</style>