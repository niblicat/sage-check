<script lang="ts">
    import TaskList from './tasklist.svelte';
    import testtasks from '$lib/tasks.json';
    import { type Task } from './todo';
    import { onMount } from 'svelte';

    import { lastID } from "./todo";
    import DynamicButton from './dynamicbutton.svelte';
    import { styles } from './themes.svelte';
	import Dynamicbutton from './dynamicbutton.svelte';

    const debug = false;

    var tasks: Task[] = [];
    var parsedTasks: Task[];

    let taskListComp;

    onMount(() => {
        if (typeof localStorage !== 'undefined') {
            const savedTasks = localStorage.getItem('tasks');
            const savedLastID = localStorage.getItem('lastID');
            if (savedTasks) {
                parsedTasks = JSON.parse(savedTasks);
                lastID.set(Number(savedLastID));
                tasks = parsedTasks;
                stringifiedTasks = JSON.stringify(tasks, null, 2);
            }
            if (savedLastID)
                lastID.set(parseInt(savedLastID));
            else
                lastID.set(0);
            
        }

    });

    function SaveTasks() {
        const blob = new Blob([stringifiedTasks], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    $: stringifiedTasks = JSON.stringify(tasks, null, 2);
    $: myStyles = Object.entries($styles)
        .filter(([key, value]) => typeof value === 'string')
        .map(([key, value]) => `--${key}:${value}`)
        .join(';');

    $: {
        if (typeof localStorage !== 'undefined') {
            if (stringifiedTasks != "[]") {
                localStorage.setItem('tasks', stringifiedTasks);

            }
        }
    }
    $: {
        if (typeof localStorage !== 'undefined') {
            if ($lastID != 0) {
                localStorage.setItem('lastID', $lastID.toString());
            }
        }
    }

</script>


<svelte:head>
    <link rel="stylesheet" media="screen" href="fonts/fonts.css" type="text/css"/>
    <title>
        To-do
    </title>
</svelte:head>
<div data-sveltekit-preload-data="hover" class="content {$styles.hasgradient === false ? "nogradient" : ""}" style={myStyles}>
    <div class="main-container">
    <main>
        <h1>To-do</h1>

        <div class="task-box">
            {#key parsedTasks}
            <TaskList
            bind:this={taskListComp}
            level={0}
            {tasks}
            {debug}
            on:updateParent={(e) => {
                tasks = e.detail;
                parsedTasks = parsedTasks;
            }}
            on:clearTasks={() => {
                tasks = [];
                localStorage.setItem('tasks', "[]");
                parsedTasks = parsedTasks;
            }}
            />
            {/key}
        </div>
    </main>
    </div>
    <div class="controllers">
        <DynamicButton
        id="new-task"
        class="regular wide"
        oclass="wide-container"
        scalemin={0.99}
        scalemax={1.01}
        on:click={() => {
            let title = prompt('New task name');
            if (typeof title == 'string')
                taskListComp.AddTask(title);
        }}
        >
            new
        </DynamicButton><!--
        --><DynamicButton
        id="clear-tasks"
        class="regular wide"
        oclass="wide-container"
        scalemin={0.99}
        scalemax={1.01}
        on:click={() => {
            let confirmation = confirm("Are you sure you want to clear all todos?");
            if (confirmation)
                taskListComp.ClearTasks();
        }}
        >
            clear
        </DynamicButton>
    </div>

    {#if debug}
        <div>
            <button
            class="regular"
            on:click={() => {
                alert(stringifiedTasks);
            }}
            >
                Overall Description
            </button>
        
            <button
            class="regular"
            on:click={() => {
                parsedTasks = parsedTasks;
            }}
            >
                Force Update
            </button>
            <button
            class="regular"
            on:click={() => {
                tasks = testtasks;
                parsedTasks = tasks;
                lastID.set(5);
            }}
            >
                Use Template
            </button>
        
            <DynamicButton
            on:click={() => alert("bruh")}
            class="regular"
            oclass="container"
            >
                testbutton
            </DynamicButton>

        </div>
    {/if}
    <div class="right-side-content">
        <DynamicButton
        on:click={() => SaveTasks()}
        id="save-tasks"
        class="regular"
        oclass="container"
        scalemin={0.99}
        scalemax={1.01}
        >
            save
        </DynamicButton>
    </div>

</div>


<style>
    :global(html), :global(body) {
        margin: 0px;
        padding: 0px;
        overflow: auto;
    }

    *, :global(*) {
        margin: 0px;
        padding: 0px;
        font-family: ExoRegular, Arial, Helvetica, sans-serif;
        --fontsize: 16px;
        transition: all .2s ease-in-out;
        animation: fadeIn .5s;
        -webkit-animation: fadeIn .5s;
        -moz-animation: fadeIn .5s;
        -o-animation: fadeIn .5s;
        -ms-animation: fadeIn .5s;
        box-sizing: border-box;
    }

    *::-webkit-scrollbar {
        background-color: transparent;
        width: 6px;
    }

    *::-webkit-scrollbar-track {
        background-color: transparent;
        margin-block: 18px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: var(--text);
        border-radius: 25px;
        border: 6px solid transparent;
    }

    .content {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex: 0fr 1fr;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0px;
        padding: 0px;
        background-color: var(--altbackground);
        background-image: linear-gradient(var(--gradientdirection, 'to bottom right'), var(--background), var(--altbackground));
        color: var(--text);
    }

    .nogradient {
        background-image: none;
    }

    .main-container {
        height: 88vh;
        width: min(600px, 92vw);
        overflow: hidden;
        scrollbar-color: var(--text) transparent;
        scrollbar-width: thin;
        scroll-padding: 20px;
    }
    
    main {
        width: 100%;
        height: 100%;
        padding: 2em;
        background-color: var(--main);
        border: 2px solid var(--input);
        border-radius: 25px 25px 0 0;
        overflow: auto;
    }

    h1 {
        text-align: center;
        padding: 0.2em;
    }

    .controllers {
        font-size: var(--fontsize);
        display: flex;
        width: min(600px, 92vw);
        height: 2.5em;
        border-radius: 0 0 25px 25px;
        background-color: var(--main);
    }

    button, :global(button) {
        cursor: pointer;
    }

    :global(button.container) {
        height: 28px;
        width: 60px;
    }

    :global(button.round) {
        height: 20px;
        width: 20px;
    }

    button.regular, :global(button.regular) {
        border-radius: 25px;
        border: 2px solid var(--main);
        color: var(--text);
        background-color: var(--input);
    }

    button.regular:disabled, :global(button.regular:disabled) {
        color: var(--neutral);
    }

    button.regular:not(:focus-visible), :global(button.regular:not(:focus-visible)) {
        background-color: var(--input);
        border: 2px solid var(--main);
    }

    @media(hover: hover) {
        button.regular:hover, button.regular:focus-visible, :global(button.regular:hover), :global(button.regular:focus-visible) {
            background-color: var(--altbackground);
            border: 2px solid var(--input);
        }
    }

    :global(button.wide) {
        font-size: var(--fontsize);
        border-radius: 0;
    }

    :global(button.wide-container) {
        height: 100%;
        width: 50%;
    }

    :global(button#new-task) {
        border-right: 1px solid var(--main);
        border-radius: 0 0 0 25px;
    }

    :global(button#clear-tasks) {
        border-left: 1px solid var(--main)a;
        border-radius: 0 0 25px 0;
    }

    .right-side-content {
        position: absolute;
        padding: 8px;
        top: 0;
        right: 0;
    }
</style>