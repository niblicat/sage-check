<script lang="ts">
    import TaskList from './tasklist.svelte';
    import testtasks from '$lib/tasks.json';
    import { type Task } from './todo';
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import type { PageData, ActionData } from './$types';
    import { lastID } from "./todo";
    import DynamicButton from './dynamicbutton.svelte';
    import { styles } from './themes.svelte';

    export let data: PageData;
    export let form: ActionData;
    var tasks: Task[] = [];
    var parsedTasks: Task[];
    onMount(() => {
        
        if (typeof data.tasks === "string" && typeof data.lastID === "string") {
            parsedTasks = JSON.parse(data.tasks);
            lastID.set(Number(data.lastID));

            console.log("tasks from cookie: " + data.tasks);
            console.log("lastID from cookie: " + data.lastID);
            tasks = parsedTasks;
            stringifiedTasks = JSON.stringify(tasks, null);
        }

    });

    $: stringifiedTasks = JSON.stringify(tasks, null);
    $: myStyles = Object.entries($styles)
        .filter(([key, value]) => typeof value === 'string')
        .map(([key, value]) => `--${key}:${value}`)
        .join(';');

</script>


<svelte:head>
    <link rel="stylesheet" media="screen" href="fonts/fonts.css" type="text/css"/>
    <title>
        Todos
    </title>
</svelte:head>
<html lang="en">
<body class={$styles.hasgradient === false ? "nogradient" : ""} style={myStyles}>

    <h1>Todo</h1>

    {#key parsedTasks}
    <TaskList
    level={0}
    {tasks}
    on:updateParent={(e) => {
        console.log('Received updateParent event:', e.detail);
        tasks = e.detail;
        parsedTasks = parsedTasks;
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
        parsedTasks = parsedTasks;
    }}
    >
        Force Update
    </button>
    <button
    on:click={() => {
        tasks = testtasks;
        parsedTasks = tasks;
        lastID.set(5);
    }}
    >
        Use Template
    </button>

    <form method="POST" action=?/save use:enhance>
        <input type="hidden" name="tasks" id="tasks" bind:value={stringifiedTasks}>
        <input type="hidden" name="lastID" id="lastID" bind:value={$lastID}>
        <button type="submit">
            save tasks
        </button>
        {#if form?.invalid}invalid submission{/if}
    </form>
    <form method="POST" action=?/delete use:enhance>
        <button type="submit">
            delete tasks
        </button>
    </form>

    <DynamicButton
    on:click={() => alert("bruh")}
    >
        testbutton
    </DynamicButton>
</body>
</html>


<style>
    html, body {
        margin: 0px;
        padding: 0px;
        background-color: var(--background);
        background-image: linear-gradient(var(--gradientdirection, 'to bottom right'), var(--background), var(--altbackground));
        --fontsize: 20px;
    }

    .nogradient {
        background-image: none;
    }

    :global(html), :global(body) {
        margin: 0px;
        padding: 0px;
    }

    body {
        color: var(--text);
        height: 100vh;
        width: 100vw;
    }

    * {
        margin: 0px;
        padding: 0px;
    }

</style>