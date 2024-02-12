<script>
	export let label = '';
</script>

<div class="slot flex justify-center flex-col gap-lg">
	<slot name="label">
		<div class="text-xl font-poppins flex justify-center">{label}</div>
	</slot>

	<div class="flex flex-wrap gap-x-lg gap-y-xl justify-center items-center">
		<slot />
	</div>
</div>
