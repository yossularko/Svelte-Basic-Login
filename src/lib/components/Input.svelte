<script lang="ts">
	export let label = '';
	export let type = '';
	export let id = '';
	export let placeholder = '';
	export let value = '';

	const onInput = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const target = e.target as HTMLInputElement;
		value = target.value;
	};
</script>

<div class="form-control">
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input {type} {placeholder} {id} {value} on:input={onInput} class="input input-bordered" />
</div>
