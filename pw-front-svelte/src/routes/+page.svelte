  <Loader ready={dataLoaded}>
    <Section label="Server">
      <LCard label="Server Information" background="bg-primary-500" slotClass="p-lg flex items-center justify-center">
        <ServerStats/>
      </LCard>
    </Section>
    
    <Section label="Actions">
      <slot>
        {#each cards as { label, action, actionExternal, background, bgImage, icon } (label)}
          <LCard {label} {action} {actionExternal} {background} {bgImage} {icon}></LCard>
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
  </Loader>



<script>  
  import Loader from '@/components/loader.svelte';

  import Server from "svelte-material-icons/Server.svelte";

	import { fetchLivestreams } from '$lib/youtubeAPI';

  import LCard from '../components/landing/landing-card.svelte';
  import YTCard from '../components/landing/yt-card.svelte';
  import ServerStats from '../components/landing/serverStats.svelte';
  import Section from '../components/section.svelte';

	import { onMount } from 'svelte';

  import { label, title, dockerCompose, initializeData } from '@/lib/store'
  label.set('PalDash<span class="hidden lg:inline">- Control Panel</span>')
  title.set('PalDash')

  /**
	 * @type {string | any[] | undefined}
	 */
  let ytVideos = [];
  let dataLoaded = false;

	onMount(async () => {
    if(!$dockerCompose) await initializeData()
    ytVideos = await fetchLivestreams();
    dataLoaded = true;
	});

  const cards = [
    {
      label: 'Player Info',
      action: 'players',
      bgImage: 'player-info-bg.webp',
    },
    {
      label: 'Server Config',
      action: 'config',
      background: 'bg-secondary-500',
      icon: Server,
    },
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
