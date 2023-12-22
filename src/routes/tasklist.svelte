<script lang="ts">
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let tasks: Task[] = [];
    export let level = 0;

    var items = tasks;
    var flipDurationMs = 100;

    function handleDndConsider(e: CustomEvent) {
        items = e.detail.items;
    }
    function handleDndFinalize(e: CustomEvent) {
        items = e.detail.items;
        dispatch('updateParent', items);
    }

</script>

<ul use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item (item.id)}
        <li animate:flip="{{duration: flipDurationMs}}">
            <slot />
            {item.title}
            {#if item.sub.length > 0}
                <svelte:self
                tasks={item.sub}
                level={level + 1}
                on:updateParent={(e) => {
                    item.sub = e.detail;
                    alert(JSON.stringify(items, null, 2) + ' level=' + level);
                    dispatch('updateParent', items);
                }}
                />
            {/if}
        </li>
    {/each}
</ul>

<button
on:click={() => {
    alert(JSON.stringify(items, null, 2));
}}
>
    L{level}
</button>

<style>

</style>