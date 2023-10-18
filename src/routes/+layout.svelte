<script lang="ts">
	import '$lib/app.css';
	import { onMount } from 'svelte';
	import { validateUserToken } from '$lib/functions/auth';
	import { initUserData, user } from '$lib/store';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Backendless from 'backendless';

	const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
	const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

	let isSiteReadyToLoad = false;

	const handleLogout = async () => {
		user.set(initUserData);
		await Backendless.UserService.logout();
		await goto('/login');
	};

	onMount(async () => {
		await validateUserToken();

		// Load the site
		isSiteReadyToLoad = true;
	});
</script>

{#if isSiteReadyToLoad}
	<div transition:fade>
		{#if $user.email}
			<div class="flex space-x-2">
				<h1>Welcome, {$user.email}</h1>
				<button class="btn btn-sm text-xs capitalize" on:click={handleLogout}>Logout</button>
			</div>
		{:else}
			<h1>Please login</h1>
		{/if}

		<slot />
	</div>
{/if}
