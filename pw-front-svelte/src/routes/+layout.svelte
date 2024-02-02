<main class="flex flex-col justify-between min-h-screen	items-center">
  <div class="flex flex-col items-center justify-center gap-2xl">

    <PHeader></PHeader>
    <slot />
    <div class="text-md">Dashboard App by xrlabs</div>
  </div>

  <div class="text-center flex flex-col gap-md">
    <div class="text-sm">
      <div>All rights to Palworld by:</div>
      <img src="Pocketpair_Logo_White.png" alt="pocketpair logo" width="200px"/>
    </div>
  </div>
</main>

<script>
  import "../app.css";
  import "@fontsource/inter";
  import "@fontsource/poppins";
  import PHeader from '../components/landing/header.svelte';

</script>

<style lang="postcss">
  main {
    background-image: url('palworld-mons-01-min.png');
    background-position: bottom right;
    background-repeat: no-repeat;
    background-size: 400px;
  }
</style>