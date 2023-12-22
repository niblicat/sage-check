<script lang="ts">
    import TaskList from './tasklist.svelte';
    import tasks from '$lib/tasks.json';
    import * as todo from './todo';
    import type { Task } from './todo';
    import { onMount } from 'svelte';

    var workingTasks: Task[] = tasks;
    onMount(() => {
        
    });

</script>

<h1>Todo</h1>
<TaskList
tasks={workingTasks}
level={0}
on:updateTodos={(e) => {
    alert(JSON.stringify(e.detail, null, 2));
    workingTasks = e.detail;
}}
/>
<br>
<br>
<button
on:click={() => {
    alert(JSON.stringify(tasks, null, 2));
}}
>
    BIG
</button>

<style>

</style>