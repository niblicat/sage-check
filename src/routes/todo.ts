import { writable } from 'svelte/store';

export const lastID = writable(0);

export function incrementLastID() {
    lastID.update((n) => n += 1);
}
export function overwriteLastID(num: number) {
    lastID.set(num);
}

export interface Task {
    id: number,
    title: string,
    completed: boolean,
    sub: Task[]
};

