import Backendless from 'backendless';
import { initUserData, user } from '$lib/store';
import publicRoutes from '$lib/data/publicRoutes.json';
import { goto } from '$app/navigation';
import type { UserData } from '$lib/types';

export const validateUserToken = async () => {
	try {
		const response = await Backendless.UserService.getCurrentUser();

		if (response) {
			// Valid user found
			user.set(response as UserData);
		} else {
			// Unset the user store
			user.set(initUserData);

			// Invalid user found. Grab their current location to match against the publicRoutes list
			const currentLocation = window.location.pathname;

			// This will redirect if the unauthenticated user is on a private route
			if (!publicRoutes.includes(currentLocation)) {
				await goto('/login?error=expired-token');
				return false;
			}
		}
	} catch (error) {
		// User has invalid token, so log them out
		await Backendless.UserService.logout();
		await goto('/?error=expired-token');
		return false;
	}
};
