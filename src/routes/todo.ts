
interface Task {
    id: number,
    title: string,
    completed: boolean,
    sub: Task[]
}

let todos: Task[] = [
    {
        id: 1,
        title: "Task 1",
        completed: false,
        sub: [
            {
                id: 2,
                title: "Sub Task 1",
                completed: false,
                sub: []
            },
            {
                id: 3,
                title: "Sub Task 2",
                completed: false,
                sub: []
            }
        ],
    },
    {
        id: 4,
        title: "Task 2",
        completed: false,
        sub: [
            {
                id: 5,
                title: "Sub Task 3",
                completed: false,
                sub: []
            }
        ],
    },
]