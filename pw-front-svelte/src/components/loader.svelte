{#if !ready}
  <div class="w-full flex justify-center">
    <Loading {size} class="animate-spin"></Loading>
  </div>
{:else}
  <slot/>
{/if}

<script lang="ts">
  import Loading from "svelte-material-icons/Loading.svelte";

  let size = 64;
  export let ready: Boolean;

</script>
