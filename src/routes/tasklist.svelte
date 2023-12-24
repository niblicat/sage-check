<script lang="ts">
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';
    import { lastID } from "./todo";
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
    
    function addChild(title: string, subItems: Task[]) {
        // get next id from db
        let newTask: Task = {
            "id": $lastID + 1,
            "title": title,
            "completed": false,
            "sub": []
        }
        todo.incrementLastID();
        subItems.push(newTask);

        items = items;
        dispatch('updateParent', items);
    }
    function addTask(title: string) {
        // get next id from db
        let newTask: Task = {
            "id": $lastID + 1,
            "title": title,
            "completed": false,
            "sub": []
        }
        todo.incrementLastID();
        items.push(newTask);

        items = items;
        dispatch('updateParent', items);
    }
    function removeSelf(item: Task) {
        // delete self
        let itemIndex = items.indexOf(item);
        items.splice(itemIndex, 1);

        items = items;
        dispatch('updateParent', items);

    }
    function toggleComplete(item: Task) {
        // flip state
        item.completed = !item.completed;

        items = items;
        dispatch('updateParent', items);
    }

</script>

<ul use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item (item.id)}
        <li animate:flip="{{duration: flipDurationMs}}">
            <slot />
            {item.title}
            <button on:click={() => toggleComplete(item)}>✓</button>
            <button on:click={() => addChild("test", item.sub)}>+</button>
            {#if item.completed}<button on:click={() => removeSelf(item)}>-</button>{/if}
            {#if item.sub.length > 0}
                <svelte:self
                tasks={item.sub}
                level={level + 1}
                on:updateParent={(e) => {
                    item.sub = e.detail;
                    // alert(JSON.stringify(items, null, 2) + ' level=' + level);
                    dispatch('updateParent', items);
                }}
                />
            {/if}
        </li>
    {/each}
</ul>

<button
style="width:120px; height: 10px; font-size: 6px;"
on:click={() => {
    alert(JSON.stringify(items, null, 2));
}}
>
    L{level}
</button>
<button
style="width:120px; height: 10px; font-size: 6px;"
on:click={() => {
    addTask("testtask")
}}
>
    Append task
</button>

<style>

</style>