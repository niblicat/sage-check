<script lang="ts">
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import * as todo from './todo';
    import type { Task } from './todo';
    import { lastID } from "./todo";
    import { createEventDispatcher } from "svelte";
    import Checkbox from "./checkbox.svelte";
    import DynamicButton from "./dynamicbutton.svelte";

    const dispatch = createEventDispatcher();

    export let tasks: Task[] = [];
    export let level: number;
    export let debug: boolean = false;

    var items = tasks;
    var flipDurationMs = 200;

    function handleDndConsider(e: CustomEvent) {
        items = e.detail.items;
        // dispatch('updateParent', items);
    }

    function handleDndFinalize(e: CustomEvent) {
        items = e.detail.items;
        dispatch('updateParent', items);
    }
    
    function AddChild(title: string, subItems: Task[]) {
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
    function AddTask(title: string) {
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
    function RemoveSelf(item: Task) {
        // delete self
        let itemIndex = items.indexOf(item);
        items.splice(itemIndex, 1);

        items = items;
        dispatch('updateParent', items);
    }
    function RenameTask(item: Task, title: string) {
        item.title = title;
        items = items;
        dispatch('updateParent', items);
    }

    function ClearTasks() {
        items = [];
        lastID.set(0);

        items = items;
    }
</script>

<section class="in-use" use:dndzone="{{items, flipDurationMs, centreDraggedOnCursor: true, dropTargetStyle: {outline: '#022859D9 solid 2px'} }}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item (item.id)}
        <div animate:flip="{{duration: flipDurationMs}}">
            <Checkbox
            bind:checked={item.completed}
            on:dblclick={() => {
                let newTitle = prompt('New task name', item.title);
                if (typeof newTitle == 'string')
                    RenameTask(item, newTitle)
            }}
            >
                {item.title}
            </Checkbox>
            <slot />
            <DynamicButton
            on:click={() => {
                let title = prompt('New task name');
                if (typeof title == 'string')
                    AddChild(title, item.sub)
            }}
            class="regular"
            oclass="round"
            >
            +
            </DynamicButton>
            {#if item.completed}
                <DynamicButton
                on:click={() => RemoveSelf(item)}
                class="regular"
                oclass="round"
                >
                -
                </DynamicButton>
            {/if}
                <svelte:self
                tasks={item.sub}
                level={level + 1}
                on:updateParent={(e) => {
                    item.sub = e.detail;
                    if (debug) console.log(JSON.stringify(items, null, 2) + ' level=' + level);
                    dispatch('updateParent', items);
                }}
                />
        </div>
    {/each}
</section>

{#if debug}
    <DynamicButton
    class="regular"
    oclass="container"
    on:click={() => {
        alert(JSON.stringify(items, null, 2));
    }}
    >
        L{level}
    </DynamicButton>
{/if}
{#if level === 0}
    <DynamicButton
    class="regular"
    oclass="container"
    on:click={() => {
        let title = prompt('New task name');
        if (typeof title == 'string')
            AddTask(title);
    }}
    >
        new
    </DynamicButton>
    <DynamicButton
    class="regular"
    oclass="container"
    on:click={() => {
        let confirmation = confirm("Are you sure you want to clear all todos?");
        if (confirmation)
            ClearTasks();
    }}
    >
        clear
    </DynamicButton>
{/if}


<style>
section {
    width: auto;
    padding: 0.4em;
    overflow-y: auto;
    height: auto;
    border: 2px solid #0228591A;
    background-color: #0228591A;
    border-radius: 25px;
}
div {
    width: calc(100% - 0.5em);
    padding: 0.4em;
    margin: 0.15em 0;
    
}

</style>