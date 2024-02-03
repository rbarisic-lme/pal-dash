<slot/>

<script>
  import { label, title } from '@/lib/store'
  label.set('Server Config')
  title.set('PalDash - ' + $label)
</script>