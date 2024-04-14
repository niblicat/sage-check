<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let scalemin = 0.9;
    export let scalemax = 1.1;

    let amClicked: boolean = false;
    
    // prevents duplicate clicks
    function handleClick() {
        if (!amClicked) {
            amClicked = true;
            dispatch('click');
            setTimeout(() => {
                amClicked = false;
            }, 5);
        }
    }
    $: dynStyles = `--scalemin:${scalemin}; --scalemax:${scalemax};`;
    // Object.entries($styles)
    //     .filter(([key, value]) => typeof value === 'string')
    //     .map(([key, value]) => `--${key}:${value}`)
    //     .join(';');
</script>

<button
class="outer {$$restProps.oclass || ''}"
tabindex="-1"
on:click={handleClick}
style={dynStyles}
>
    <button
    id="{$$restProps.id || ''}"
    class="inner {$$restProps.class || ''}"
    title="{$$restProps.title || ''}"
    on:click={handleClick}
    >
        <slot/>
    </button>
</button>

<style lang="">
    button.outer {
        margin: 0;
        background-color: transparent;
        border: 0;
    }

    button.inner {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    @media(hover: hover) {
        button.inner:hover, button.inner:focus-visible {
            transform: scale(var(--scalemax));
            -webkit-transform: scale(var(--scalemax));
            -moz-transform: scale(var(--scalemax));
            -o-transform: scale(var(--scalemax));
            -ms-transform: scale(var(--scalemax));
        }
    }

    button.inner:active {
        transform: scale(var(--scalemin));
        -webkit-transform: scale(var(--scalemin));
        -moz-transform: scale(var(--scalemin));
        -o-transform: scale(var(--scalemin));
        -ms-transform: scale(var(--scalemin));
    }
</style>