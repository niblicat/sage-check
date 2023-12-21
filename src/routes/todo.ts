import tasks from '$lib/tasks.json';
import * as fs from 'fs';

const taskpath = '$lib/tasks.json';

export interface Task {
    id: number,
    title: string,
    completed: boolean,
    sub: Task[]
};

export function overwriteTodos(taskData: Task[]) {
    let writeData = JSON.stringify(taskData, null, 2);
    fs.writeFileSync(taskpath, writeData);
}

export function deleteTodo(id: number) {

}
export function addTodo(id: number) {

}