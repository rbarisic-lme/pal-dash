<div
  role="button"
  tabindex="0"
  aria-label={label}
  on:click={getAction}
  on:keydown={getAction}
  class="flex flex-col gap-md {action ? 'hover:brightness-125 transition transform-gpu hover:-rotate-1' : ''}"
  style="{bigModeStyleWidth}">
  
    <div
      class="{slotClass} overflow-clip {(background ? background + ' ' : 'bg-white')} landing-card rounded-lg"
      style="background-image: url('{bgImage ? bgImage : ''}');
      {bigModeStyleWidth} {bigModeStyleHeight}">
      
      <slot/>

    </div>

  {#if label}
    <p>{label}</p>
  {/if}
</div>

<script>
  import { goto } from '$app/navigation';
  
  export let label = '';

  export let slotClass = '';
  
  export let action = '';
  export let actionExternal = false;
  
  export let background = '';
  export let bgImage = '';

  export let bigMode = false;

  export let widescreen = false

  const getHeight = () => {
    let height = widescreen ? 168 : 200
    return bigMode ? height * 2 : height
  }

  let bigModeStyleWidth = bigMode ? 'width: 620px;' : 'width: 300px;';
  let bigModeStyleHeight = `height: ${getHeight()}px`;


  const getAction = () => {
    if(actionExternal) {
      window.location = action
    } else {
      action ? goto(action) : () => {}
    }
  }

</script>

<style lang="postcss">
  .landing-card {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>