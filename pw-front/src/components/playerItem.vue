<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="row wrap q-col-gutter-md">
          <div class="col-auto wrap">
            <div>Player ID: </div>
            <div>Erstellt am: </div>
          </div>

          <div class="col wrap">
            <div>{{ player?.value }}</div>
            <div>{{ new Date(player?.stats?.stat?.birthtimeMs).toLocaleString('de-DE') }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn color="primary" :to="`/paldex/${player?.value?.slice(0, -4)}`">Anzeigen</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'playerItem',
  components: {  },
  props: {
    player: Object,
  },
  setup () {
    return {  };
  }
});
</script>
