<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let height = "60px";
    export let width = "28px";

    let amClicked: boolean = false;
    
    function handleClick() {
        if (!amClicked) {
            amClicked = true;
            dispatch('click');
            setTimeout(() => {
                amClicked = false;
            }, 5);
        }
    }

    $: cssVarStyles = '--height:' + height + ';' + '--width:' + width + ';'
</script>

<button
class="outer"
tabindex="-1"
on:click={handleClick}
style={cssVarStyles}
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

<style>
    button.outer {
        width: var(--width);
        height: var(--height);
        margin: 0;
        background-color: transparent;
        border: 0;
    }

    button.inner {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }


    @media(hover: hover) {
        button.inner:hover, button.inner:focus-visible {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
            -ms-transform: scale(1.1);
        }
    }

    button.inner:active {
        transform: scale(0.9);
        -webkit-transform: scale(0.9);
        -moz-transform: scale(0.9);
        -o-transform: scale(0.9);
        -ms-transform: scale(0.9);
    }
</style>