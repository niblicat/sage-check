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
</script>

<button
class="outer {$$restProps.oclass || ''}"
tabindex="-1"
on:click={handleClick}
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