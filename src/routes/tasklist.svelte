<script lang="ts">
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';
    import { lastID } from "./todo";
    import { createEventDispatcher } from "svelte";
    import Checkbox from "./checkbox.svelte";

    const dispatch = createEventDispatcher();

    export let tasks: Task[] = [];
    export let level: number;
    export let debug: boolean = false;

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

    <section class="in-use" use:dndzone="{{items, flipDurationMs, centreDraggedOnCursor: true }}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item (item.id)}
            <div animate:flip="{{duration: flipDurationMs}}">
                <Checkbox bind:checked={item.completed}>
                    {item.title}
                </Checkbox>
                <slot />
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

{#if debug}
<button
style="width:120px; height: 10px; font-size: 6px;"
on:click={() => {
    alert(JSON.stringify(items, null, 2));
}}
>
    L{level}
</button>
{/if}
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
    padding: 0.4em;
    overflow-y: auto ;
    height: auto;
    background-color: #0228591A;
    border-radius: 25px;
}
div {
    width: 90%;
    padding: 0.3em;
    margin: 0.15em 0;
}
</style>