<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked: boolean = false;

    const dispatch = createEventDispatcher();
</script>

<label
class={$$restProps.lclass || ''}
>
    <slot />
    <input
    type="checkbox"
    id={$$restProps.id || ''}
    class={$$restProps.class || ''}
    title={$$restProps.title || ''}
    on:click={() => dispatch('click')}
    bind:checked={checked}
    >
    <span class={$$restProps.sclass || ''} />
</label>

<style>
    label {
        position: relative;
        padding-left: 25px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
        label input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    span {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 5px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    label:hover input ~ span {
        background-color: #ccc;
    }
    input:focus + span
    {
      background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    label input:checked ~ span {
        background-color: #2196F3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    span:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    label input:checked ~ span:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    label span:after {
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
        span:hover, span:focus-visible, input:focus + span {
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


