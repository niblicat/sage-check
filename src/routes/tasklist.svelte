<script lang="ts">
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";

    import tasks from '$lib/tasks.json';

    var items = tasks;
    var flipDurationMs = 200;

    function handleDndConsider(e: CustomEvent) {
        items = e.detail.items;
    }
    function handleDndFinalize(e: CustomEvent) {
        items = e.detail.items;
    }

</script>

<section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item(item.id)}
    <div animate:flip="{{duration: flipDurationMs}}">{item.title}</div>
    {/each}
</section>

<button
on:click={() => {
    alert(items);
}}
>itemstest</button>

<style>

</style>