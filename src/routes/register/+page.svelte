<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';

	let pendingRegistration = true;

	let registerData = {
		email: '',
		password: ''
	};
	async function handleRegister(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		e.preventDefault();

		try {
			let user = new Backendless.User();
			user.email = registerData.email;
			user.password = registerData.password;

			await Backendless.UserService.register(user);

			pendingRegistration = !pendingRegistration;

			setTimeout(async () => {
				await goto('/login');
			}, 3000);
		} catch (error: any) {
			console.log('error register: ', error);
			alert(error?.message || 'Gagal register');
		}
	}
</script>

<div class="container mx-auto">
	<h1 class="text-4xl font-bold">Register</h1>

	{#if pendingRegistration}
		<form on:submit={handleRegister} class="card card-body" style="max-width: 400px">
			<Input label="Email:" id="register-email" bind:value={registerData.email} type="email" />
			<Input
				label="Password:"
				id="register-password"
				bind:value={registerData.password}
				type="password"
			/>
			<button type="submit" class="btn btn-primary">Register</button>
		</form>
	{:else}
		<h2 class="text-lg">Hooray!</h2>
	{/if}
</div>
