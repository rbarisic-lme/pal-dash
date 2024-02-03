<div class="text-white w-full flex flex-col items-center justify-center gap-md pt-xl">
    <div class="font-bold font-lead text-lead leading-none">
      <slot>
        PalDash<span class="hidden lg:inline">- Control Panel</span>
      </slot>
    </div>
  <div>{serverName}</div>
</div>

<script>
  const serverName = '381worldwide'
</script>

<style lang="postcss">
</style>