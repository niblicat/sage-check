<script lang="ts">
    import {flip} from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';
    import { lastID } from "./todo";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let tasks: Task[] = [];
    export let level: number;

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
        items = [...items, newTask]

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

{#if items.length > 0}
    <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item (item.id)}
            <div animate:flip="{{duration: flipDurationMs}}">
                <slot />
                {item.title}
                <button on:click={() => toggleComplete(item)}>✓</button>
                <button on:click={() => addChild("test", item.sub)}>+</button>
                {#if item.completed}<button on:click={() => removeSelf(item)}>-</button>{/if}
                    <svelte:self
                    tasks={item.sub}
                    level={level + 1}
                    on:updateParent={(e) => {
                        item.sub = e.detail;
                        console.log(JSON.stringify(items, null, 2) + ' level=' + level);
                        dispatch('updateParent', items);
                    }}
                    />
            </div>
        {/each}
    </section>
{/if}

<button
style="width:120px; height: 10px; font-size: 6px;"
on:click={() => {
    alert(JSON.stringify(items, null, 2));
}}
>
    L{level}
</button>
{#if level === 0}
    <button
    style="width:120px; height: 10px; font-size: 6px;"
    on:click={() => {
        addTask("testtask")
    }}
    >
        Append task
    </button>
{/if}


<style>	
section {
    width: auto;
    max-width: 400px;
    border: 0px solid black;
    padding: 0.4em;
    /* this will allow the dragged element to scroll the list */
    overflow-y: auto ;
    height: auto;
    background-color: rgba(100, 100, 100, 0.1); 
}
div {
    width: 90%;
    padding: 0.3em;
    border: 0px solid blue;
    margin: 0.15em 0;
    background-color: rgba(00, 100, 100, 0.1);
}
</style>