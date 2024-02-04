<script lang="ts">
	import { label, title } from '@/lib/store';
	label.set('Player Overview');
	title.set('PalDash - ' + $label);
</script>

<slot />
