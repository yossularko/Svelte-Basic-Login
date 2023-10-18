<script lang="ts">
	import '$lib/app.css';
	import Backendless from 'backendless';
	const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
	const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

	import { user } from '$lib/store';
</script>

{#if $user.email}
	<h1>Welcome, {$user.name}</h1>
<!-- {:else}
	<h1>Not Logged In</h1> -->
{/if}

<slot />
