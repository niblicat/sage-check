<script lang="ts">
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';

    export let tasks: Task[] = [];

    export let level = 0;

    // export let tasks: any = [];

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
    {#each items as item (item.id)}
        <div animate:flip="{{duration: flipDurationMs}}">
            <slot />
            {item.title}
            {#if item.sub.length > 0}
                <svelte:self
                tasks={item.sub}
                level={level + 1}
                />
            {/if}
        </div>
    {/each}
</section>

<button
on:click={() => {
    alert(JSON.stringify(items, null, 2));
}}
>
    {level}
</button>

<style>

</style>