<script lang="ts">
    import TaskList from './tasklist.svelte';
    import testtasks from '$lib/tasks.json';
    import { type Task } from './todo';
    import { onMount } from 'svelte';

    import { lastID } from "./todo";
    import DynamicButton from './dynamicbutton.svelte';
    import { styles } from './themes.svelte';

    const debug = false;

    let saveform: HTMLFormElement;

    var tasks: Task[] = [];
    var parsedTasks: Task[];

    onMount(() => {
        if (typeof localStorage !== 'undefined') {
            console.log('bby');
            const savedTasks = localStorage.getItem('tasks');
            const savedLastID = localStorage.getItem('lastID');
            if (savedTasks) {
                parsedTasks = JSON.parse(savedTasks);
                lastID.set(Number(savedLastID));
                tasks = parsedTasks;
                stringifiedTasks = JSON.stringify(tasks, null, 2);
                console.log(stringifiedTasks);

                const tmp = JSON.stringify(tasks, null, 2);
                console.log("ANOTHERTEST " + tmp);
            }
            else {
                const tmp = JSON.stringify(tasks, null, 2);
                console.log("FAILTEST " + tmp);
            }
            if (savedLastID)
                lastID.set(parseInt(savedLastID));
            else
                lastID.set(0);
            
        }

    });

    $: stringifiedTasks = JSON.stringify(tasks, null, 2);
    $: myStyles = Object.entries($styles)
        .filter(([key, value]) => typeof value === 'string')
        .map(([key, value]) => `--${key}:${value}`)
        .join(';');

    $: {
        if (typeof localStorage !== 'undefined') {
            if (stringifiedTasks != "[]") {
                localStorage.setItem('tasks', stringifiedTasks);
                console.log(stringifiedTasks);

            }

            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const tmp = JSON.stringify(tasks, null, 2);
                console.log("TEST " + tmp);
            }
        }
    }
    $: {
        if (typeof localStorage !== 'undefined') {
            if ($lastID != 0) {
                localStorage.setItem('lastID', $lastID.toString());
                console.log("lastid" + $lastID);
                
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
<html lang="en">
<body class={$styles.hasgradient === false ? "nogradient" : ""} style={myStyles}>

    <div class="main-container">
    <main>
        <h1>To-do</h1>

        <div class="task-box">
            {#key parsedTasks}
            <TaskList
            level={0}
            {tasks}
            {debug}
            on:updateParent={(e) => {
                console.log('Received updateParent event:', e.detail);
                tasks = e.detail;
                parsedTasks = parsedTasks;
                // setTimeout(() => {
                    
                //     saveform.requestSubmit();
                // }, 500);
            }}
            />
            {/key}
        </div>

    </main>
    </div>

    <!-- <form class="hidden" method="POST" action=?/save bind:this={saveform} use:enhance>
        <input type="hidden" name="tasks" id="tasks" bind:value={stringifiedTasks}>
        <input type="hidden" name="lastID" id="lastID" bind:value={$lastID}>
        {#if form?.invalid}invalid submission{/if}
        <button class="hidden" type="submit"/>
    </form> -->

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
        
            <!-- <form method="POST" action=?/save use:enhance>
                <input type="hidden" name="tasks" id="tasks" bind:value={stringifiedTasks}>
                <input type="hidden" name="lastID" id="lastID" bind:value={$lastID}>
                <button class="regular" type="submit">
                    save tasks
                </button>
                {#if form?.invalid}invalid submission{/if}
            </form>
            <form method="POST" action=?/delete use:enhance>
                <button class="regular" type="submit">
                    delete tasks
                </button>
            </form> -->
        
            <DynamicButton
            on:click={() => alert("bruh")}
            class="regular"
            oclass="container"
            >
                testbutton
            </DynamicButton>

        </div>
    {/if}

</body>
</html>


<style>
    html, body {
        margin: 0px;
        padding: 0px;
        background-color: var(--altbackground);
        background-image: linear-gradient(var(--gradientdirection, 'to bottom right'), var(--background), var(--altbackground));
    }

    .nogradient {
        background-image: none;
    }

    :global(html), :global(body) {
        margin: 0px;
        padding: 0px;
        overflow: auto;
    }

    body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: var(--text);
        height: 100vh;
        width: 100vw;
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

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--text);
        border-radius: 25px;
        border: 6px solid transparent;
        background-clip: content-box;
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

    button:disabled, :global(button:disabled) {
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

    .main-container {
        height: 92vh;
        width: min(600px, 92vw);
        margin: auto;
        overflow: hidden;
    }

    main {
        width: 100%;
        height: 100%;
        padding: 2em;
        background-color: var(--main);
        border: 2px solid var(--input);
        border-radius: 25px;
        overflow: auto;
    }

    .hidden {
        position: absolute;
        width: 0;
        height: 0;
        visibility: hidden;
    }

    h1 {
        text-align: center;
        padding: 0.2em;
    }

</style>