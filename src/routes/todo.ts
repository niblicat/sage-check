import tasks from '$lib/tasks.json';
import * as fs from 'fs';

const taskpath = '$lib/tasks.json';

interface Task {
    id: number,
    title: string,
    completed: boolean,
    sub: Task[]
};

function overwriteTodos(taskData: Task[]) {
    let writeData = JSON.stringify(taskData, null, 2);
    fs.writeFileSync(taskpath, writeData);
}