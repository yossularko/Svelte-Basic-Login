import { writable, type Writable } from 'svelte/store';
import type { UserData } from './types';

export const initUserData: UserData = {
	___class: 'Users',
	lastLogin: 0,
	userStatus: '',
	created: 0,
	accountType: '',
	ownerId: '',
	socialAccount: '',
	oAuthIdentities: null,
	name: '',
	blUserLocale: '',
	'user-token': '',
	updated: null,
	email: '',
	objectId: '0'
};

export const user: Writable<UserData> = writable(initUserData);
