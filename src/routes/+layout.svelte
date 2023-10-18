<script lang="ts">
	import '$lib/app.css';
	import { onMount } from 'svelte';
	import { validateUserToken } from '$lib/functions/auth';
	import { user } from '$lib/store';
	import Backendless from 'backendless';
	const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
	const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

	let isSiteReadyToLoad = false;

	onMount(async () => {
		await validateUserToken();

		// Load the site
		isSiteReadyToLoad = true;
	});
</script>

{#if isSiteReadyToLoad}
	{#if $user.email}
		<h1>Welcome, {$user.name}</h1>
	{:else}
		<h1>Please login</h1>
	{/if}

	<slot />
{/if}
