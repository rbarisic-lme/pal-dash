<Section label="Actions">
  <slot>
    {#each cards as { label, action, actionExternal, background, bgImage } (label)}
      <LCard {label} {action} {actionExternal} {background} {bgImage}></LCard>
    {/each}
  </slot>
</Section>

<Section label="Streams">
  {#if ytVideos && ytVideos.length}

    <div class="flex flex-wrap lg:flex-no-wrap justify-start gap-lg">
      <div class="flex flex-wrap gap-lg">
        <YTCard hideLabel bigMode video={ytVideos[0]}>
        </YTCard>
        <div class="flex flex-col gap-md" style="width: 300px">
          <div class="text-xl">{ytVideos[0].snippet.channelTitle}</div>
          <div class="text-lg">{ytVideos[0].snippet.title}</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-x-lg gap-y-md">
        {#each ytVideos.slice(1,4) as video}
        <YTCard {video}></YTCard>
        {/each}
      </div>
    </div>
  {/if}
</Section>


<script>
	import { fetchLivestreams } from '$lib/youtubeAPI';
  import LCard from '../components/landing/landing-card.svelte';
  import YTCard from '../components/landing/yt-card.svelte';
  import Section from '../components/section.svelte';

	import { onMount } from 'svelte';


  /**
	 * @type {string | any[] | undefined}
	 */
  let ytVideos = [];

	onMount(async () => {
    ytVideos = await fetchLivestreams();
	});

  const cards = [
    {
      label: 'Server Stats',
      background: 'bg-second',
      bgImage : '',
    },
    {
      label: 'Player Info',
      action: 'players',
      bgImage: 'player-info-bg.webp',
    },
    // {
    //   label: '',
    //   action: '',
    // },
    // {
    //   label: '',
    //   action: '',
    // },
    // {
    //   label: '',
    //   action: '',
    // },
    {
      label: 'Get PalWorld on Steam',
      action: 'https://store.steampowered.com/app/1623730/Palworld/',
      actionExternal: true,
      background: 'bg-second',
      bgImage: 'steam-image.png',
    },
  ]
</script>

<style lang="postcss">
  :global(html) {
    color: theme(colors.light);
    background-color: theme(colors.bg);
    /* background: rgb(27,4,77);
    background: -moz-linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%);
    background: linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%); */
  }
</style>