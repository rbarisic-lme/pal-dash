<LCard {bigMode} widescreen background="bg-second" label={ hideLabel ? '' : video?.snippet.title}>
  {#if !iframeLoaded}
    <div class="flex justify-center items-center w-full h-full">
      <Loading size="32" class="animate-spin w-full"/>
    </div>
  {/if}

  <iframe {width} {height}
    id="player"
    title="embedded youtube video"
    type="text/html"
    src="http://www.youtube.com/embed/{video?.id.videoId}?enablejsapi=0&origin=http://example.com"
    frameborder="0"
    on:load={handleIframeLoad}>
  </iframe>
  <slot/>
</LCard>

<script>
  import Loading from "svelte-material-icons/Loading.svelte";
  import LCard from './landing-card.svelte';

  export let video = undefined;
  export let bigMode = false;
  export let hideLabel = false;

  export let width = bigMode ? '620px' : '300px'
  export let height = `${(bigMode ? 168 * 2 : 168)}px`

  let iframeLoaded = false;

  function handleIframeLoad() {
    iframeLoaded = true;
  }
</script>