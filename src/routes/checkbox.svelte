<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked: boolean = false;
    export let clickKey: string = 'C';
    export let dblClickKey: string = 'D';

    const dispatch = createEventDispatcher();

</script>

<button
on:click={() => {
    checked = !checked;
    dispatch('click')
}}
on:dblclick={() => dispatch('dblclick')}
on:keydown={(e) => {
    switch (e.key) {
        case clickKey:
            checked = !checked
            dispatch('click')
            break;
        case dblClickKey:
            dispatch('click')
            break;

    }
}}
on:mouseup={() => dispatch('mouseup')}
on:mousedown={() => dispatch('mousedown')}
class={$$restProps.lclass || ''}
role="checkbox"
aria-checked={checked}
>
    <slot />
    <input
    type="checkbox"
    id={$$restProps.id || ''}
    class={$$restProps.class || ''}
    title={$$restProps.title || ''}
    bind:checked={checked}
    tabindex="-1"
    >
    <span class={$$restProps.sclass || ''} />
</button>

<style>
    button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        line-height: normal;
        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;
        position: relative;
        padding-left: 25px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    button input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 5px;
        background-color: #eee;
    }

    input:focus + span, button:hover > span, button:focus > span {
      background-color: #ccc;
    }

    button input:checked ~ span {
        background-color: #2196F3;
    }

    span:after {
        content: "";
        position: absolute;
        display: none;
    }

    button input:checked ~ span:after {
        display: block;
    }

    button span:after {
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    } 

    @media(hover: hover) {
        span:hover, span:focus-visible, button:focus > span {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
            -ms-transform: scale(1.1);
        }
    }

    span:active {
        transform: scale(0.9);
        -webkit-transform: scale(0.9);
        -moz-transform: scale(0.9);
        -o-transform: scale(0.9);
        -ms-transform: scale(0.9);
    }

</style>


