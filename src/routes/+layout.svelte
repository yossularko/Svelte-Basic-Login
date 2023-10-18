<script lang="ts">
	import '$lib/app.css';
	import Backendless from 'backendless';
	const BACKENDLESS_APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID;
	const BACKENDLESS_API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY;
	Backendless.initApp(BACKENDLESS_APP_ID, BACKENDLESS_API_KEY);

	import { user } from '$lib/store';
	import type { UserData } from '$lib/types';
	import Input from '$lib/components/Input.svelte';

	let loginData = {
		email: '',
		password: ''
	};

	async function handleLogin(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		e.preventDefault();

		try {
			// Log the user in. This returns a JSON object
			let response = await Backendless.UserService.login(loginData.email, loginData.password, true);

			// Save the updated user information to our svelte store
			user.set(response as UserData);
		} catch (error: any) {
			console.log('error login: ', error);
			alert(error?.message || 'Gagal Login');
		}
	}
</script>

{#if $user.email}
	<h1>Welcome, {$user.name}</h1>
{:else}
	<form on:submit={handleLogin} class="card card-body" style="max-width: 400px">
		<Input label="Email:" id="login-email" bind:value={loginData.email} type="email" />
		<Input label="Password:" id="login-password" bind:value={loginData.password} type="password" />
		<button type="submit" class="btn btn-primary">Log In</button>
	</form>
{/if}

<slot />
