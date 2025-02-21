import { writable } from 'svelte/store';

export const accessToken = writable(null);

export const userProfile = writable(null);

export const dailyMusic = writable(null);
