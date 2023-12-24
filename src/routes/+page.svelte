<script lang="ts">
    import TaskList from './tasklist.svelte';
    import testtasks from '$lib/tasks.json';
    import { overwriteLastID, type Task } from './todo';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    export let data: PageData;
    var tasks: Task[] = [];
    var parsedTasks: Task[];
    onMount(() => {
        overwriteLastID(5);
        if (typeof data.tasks === "string") {
            parsedTasks = JSON.parse(data.tasks);

            console.log("tasks from cookie: " + data.tasks);
            tasks = parsedTasks;
            stringifiedTasks = JSON.stringify(tasks, null);
        }

    });

    var stringifiedTasks = JSON.stringify(tasks, null);

</script>

<h1>Todo</h1>
{#key parsedTasks}
<TaskList
level={0}
{tasks}
on:updateParent={(e) => {
    console.log('Received updateParent event:', e.detail);
    tasks = e.detail;
    stringifiedTasks = JSON.stringify(tasks, null);
}}
/>
{/key}
<br>
<br>


<button
on:click={() => {
    alert(stringifiedTasks);
}}
>
    Overall Description
</button>

<button
on:click={() => {
    tasks = parsedTasks;
}}
>
    Force Update
</button>
<button
on:click={() => {
    tasks = testtasks;
    parsedTasks = parsedTasks;
}}
>
    Use Template
</button>

<form method="POST" action=?/save use:enhance>
    <input type="hidden" name="tasks" id="tasks" bind:value={stringifiedTasks}>
    <button type="submit">
        save tasks
    </button>
</form>
<form method="POST" action=?/delete use:enhance>
    <button type="submit">
        delete tasks
    </button>
</form>

<style>

</style>