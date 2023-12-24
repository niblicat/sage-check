<script lang="ts">
    import TaskList from './tasklist.svelte';
    import testtasks from '$lib/tasks.json';
    import { overwriteLastID, type Task } from './todo';
    import { onMount } from 'svelte';

    var tasks: Task[] = testtasks;
    onMount(() => {
        overwriteLastID(5);
    });

    function addTask(title: string) {
        // get next id from db
        let newTask: Task = {
            "id": 101,
            "title": title,
            "completed": false,
            "sub": []
        }
        tasks = [...tasks, newTask];

        console.log('Tasks after adding:', JSON.stringify(tasks, null, 2));
    }

</script>

<h1>Todo</h1>
<TaskList
tasks={tasks}
on:updateTodos={(e) => {
    console.log('Received updateTodos event:', e.detail);
    tasks = e.detail;
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