<template>
  <q-page class="row">
    <div class="full-width">
      <p class="q-px-md q-pt-md text-h6">Spieler-Übersicht</p>
      
      <q-separator></q-separator>

      <div class="row q-col-gutter-md q-pa-md">
        <template v-if="isLoading">
          <div class="col-6" v-for="i in 3" :key="i">
            <q-card>
              <q-card-section>
                <q-skeleton height="200px"></q-skeleton>
                </q-card-section>

                <q-card-section>
                <div class="flex">
                  <q-skeleton type="QBtn"></q-skeleton>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
        <template v-else>
          <player-item class="col-6" v-for="player in data" :key="player.value" :player="player"></player-item>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import playerItem from 'components/playerItem.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'PlayersPage',
  components: { playerItem },
  setup() {
    const data = ref<any>(null);
    const isLoading = ref(true);

    const fetchPlayers = async () => {
      try {
        const response = await api.get('/players');
        isLoading.value = false
        console.log(response);

        data.value = response.data.playerSaves;
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    onMounted(fetchPlayers);

    return { data, isLoading };
  }
});
</script>