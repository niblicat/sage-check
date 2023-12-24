import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const tasks = cookies.get('tasks');
    const lastID = cookies.get('lastID');
    return { 
        tasks: tasks,
        lastID: lastID
    };
};

export const actions = {
    save: async ({ cookies, request }) => {
        const data = await request.formData();
        const tasks = data.get('tasks');
        const lastID = data.get('lastID');
        if (typeof tasks === "string")
            cookies.set('tasks', tasks, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
            });
        else return fail(422, { tasks, invalid: true })
        if (typeof lastID === "string")
            cookies.set('lastID', lastID, {
                httpOnly: true,
                sameSite: 'strict',
                secure: false,
                path: '/',
            });
        else return fail(422, { lastID, invalid: true })

        return { success: true };
    },
    delete: async ({ cookies }) => {
        cookies.delete('tasks', {path: '/'});
        return { success: true };
    }
} satisfies Actions;