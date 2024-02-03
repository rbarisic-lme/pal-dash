{#if !ready}
  <Loading {size} class="animate-spin"></Loading>  
{:else}
  <slot/>
{/if}

<script lang="ts">
  import Loading from "svelte-material-icons/Loading.svelte";

  let size = 64;
  export let ready: Boolean;

</script>
