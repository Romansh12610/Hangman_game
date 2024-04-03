<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { RoutePaths } from '@/router';

    const router = useRouter();
    function navigateToPickMenu() {
        router.push(RoutePaths.PICK_CATEGORY);
    }
</script>

<template>
    <button class="play-btn" @click="navigateToPickMenu">
        <div class="play-btn__gradient"></div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 67 64"
            width="67" height="64"
        >
            <g filter="url(#a)">
                <path
                    fill="#fff"
                    d="m3.381 33.397-.283-1.845C.658 15.62-.563 7.654 4.026 3.32 8.616-1.013 16.31.84 31.7 4.545l2.035.49c21.007 5.058 31.51 7.587 33.051 15.019 1.541 7.431-7.06 14.08-24.26 27.376l-1.753 1.355c-13.98 10.808-20.972 16.212-27.15 13.67-6.18-2.543-7.534-11.382-10.242-29.058Z"
                />
            </g>
            <defs>
                <filter
                    id="a"
                    width="66.038"
                    height="62.264"
                    x=".925"
                    y=".811"
                    color-interpolation-filters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="-6" />
                    <feComposite
                        in2="hardAlpha"
                        k2="-1"
                        k3="1"
                        operator="arithmetic"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0.141176 0 0 0 0 0.188235 0 0 0 0 0.254902 0 0 0 1 0"
                    />
                    <feBlend in2="shape" result="effect1_innerShadow_15_637" />
                </filter>
            </defs>
        </svg>
    </button>
</template>


<style scoped lang="scss"> 
    @use 'ut' as *;
    
    .play-btn {
        @include colFlex(center, center);
        
        width: rem(125);
        height: rem(125);
        border-radius: 50%;
        border: rem(4) solid var(--purple-light);
        position: relative;
        overflow: hidden;
        
        background-color: var(--pink);
        transition: transform 0.48s ease-in-out, box-shadow 0.48s ease-in-out, border 0.48s ease-in-out;
        border-bottom-width: rem(14);
        box-shadow: inset 6px 10px 5px 2px var(--blue-light-op);
        
        & > svg {
            transform: scale(0.8);
            transition: transform 0.48s ease-in-out;
            z-index: 10;
        }

        // hover state
        &:hover {
            box-shadow: inset -6px -10px 5px 2px var(--blue-light-op);

            & > svg {
                transform: scale(0.8) rotate(40deg);
            }
        }

    }
</style>