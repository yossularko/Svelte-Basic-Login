<script lang="ts">
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

<div class="container mx-auto">
	<h1 class="text-4xl font-bold">Log In</h1>
	<form on:submit={handleLogin} class="card card-body" style="max-width: 400px">
		<Input label="Email:" id="login-email" bind:value={loginData.email} type="email" />
		<Input label="Password:" id="login-password" bind:value={loginData.password} type="password" />
		<button type="submit" class="btn btn-primary">Log In</button>
	</form>
</div>
