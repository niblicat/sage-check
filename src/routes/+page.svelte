<script lang="ts">
    import TaskList from './tasklist.svelte';
    import tasks from '$lib/tasks.json';
    import * as todo from './todo';

</script>

<h1>Todo</h1>
<TaskList
tasks={tasks}
level={0}
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