<script lang="ts">
	import { label, title } from '@/lib/store';
	label.set('Player Page');
	title.set('PalDash - ' + $label);
</script>

<slot />
