<script lang="ts" context="module">
    import { writable, type Writable} from 'svelte/store';

    export interface Theme {
        name: Symbol,
        background: string,
        altbackground: string,
        main: string,
        accent: string,
        contrast: string,
        complement: string,
        neutral: string,
        title?: string,
        text: string,
        altinput: string,
        input: string,
        alttext: string,
        hasgradient?: boolean,
        gradientdirection?: string
    };

    export const existingThemes = {
        Aurora: Symbol('Aurora'),
    };

    let Aurora: Theme = {
        name: existingThemes.Aurora,
        background: '#6E37A6',
        altbackground: '#F277A4',
        main: '#038C8C',
        accent: '#04BF9D',
        contrast: '#a8287e',
        complement: '#77F280',
        neutral: '#C599F2',
        title: '#fff',
        text: '#fff',
        alttext: '#000',
        input: '#022859',
        altinput: '#04BF9D',
        gradientdirection: 'to bottom right'
    };

    // name: existingThemes.Aurora,
    //     background: '#6E37A6',
    //     altbackground: '#F277A4',
    //     main: '#038C8C',
    //     accent: '#04BF9D',
    //     contrast: '#a8287e',
    //     complement: '#77F280',
    //     neutral: '#C599F2',
    //     title: '#fff',
    //     text: '#fff',
    //     alttext: '#000',
    //     input: '#022859',
    //     altinput: '#04BF9D',
    //     gradientdirection: 'to bottom right'

    export let styles: Writable<Theme> = writable(Aurora);

    export function changeTheme(newTheme: Symbol) {
        switch(newTheme) {
            case existingThemes.Aurora:
                styles.set(Aurora);
                break;
        }
    };

</script>