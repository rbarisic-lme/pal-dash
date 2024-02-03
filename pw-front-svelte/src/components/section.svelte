<div class="slot flex flex-start flex-col gap-lg">
  <slot name="label">
    <div class="text-xl font-poppins flex justify-center">{label}</div>
  </slot>
  
  <div class="max-w-screen-lg flex flex-wrap gap-x-lg gap-y-xl justify-start items-start">
    <slot/>
  </div>
</div>

<script>
  export let label = '';
</script>