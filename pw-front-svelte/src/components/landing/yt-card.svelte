<LCard {bigMode} widescreen background="bg-second" bgImage={video?.snippet.thumbnails.medium.url} label={ hideLabel ? '' : video?.snippet.title}>
  <iframe id="player" title="embedded youtube video" type="text/html" {width} {height}
    src="http://www.youtube.com/embed/{video?.id.videoId}?enablejsapi=0&origin=http://example.com"
    frameborder="0">
  </iframe>

  <slot/>
</LCard>

<script>
  import LCard from './landing-card.svelte';

  export let video = undefined;
  export let bigMode = false;
  export let hideLabel = false;

  export let width = bigMode ? '620px' : '300px'
  export let height = `${(bigMode ? 168 * 2 : 168)}px`
</script>