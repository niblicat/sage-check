import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const tasks = cookies.get('tasks');
    return { tasks: tasks };
};

export const actions = {
    save: async ({ cookies, request }) => {
        const data = await request.formData();
        const tasks = data.get('tasks');
        cookies.delete('tasks', {path: '/'});
        if (typeof tasks === "string")
            cookies.set('tasks', tasks, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
            });

        return { success: true };
    },
    delete: async ({ cookies }) => {
        cookies.delete('tasks', {path: '/'});
        return { success: true };
    }
} satisfies Actions;