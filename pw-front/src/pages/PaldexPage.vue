<template>
  <q-page class="row q-pa-md">
    <div class="q-gutter-md">
      <h4 class="q-ma-md">Spieler Informationen</h4>

      <div class="full-width q-pa-md">
      <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator label="Vollständige Speicherinformationen">
        <q-card>
          <q-card-section>
            {{ playerData }}
            <h5>Full Data:</h5>
            {{  data }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    </div>

    <q-separator class="full-width"></q-separator>

    <div class="q-gutter-md">
      <div class="row q-col-gutter-md" v-if="playerData?.PalCaptureCount?.value">
        <div class="col-4" v-for="pal in playerData.PalCaptureCount.value" :key="pal.key">
          <q-card>
            <q-card-section>
              <div class="q-gutter-md">
                <div class="text-h6">{{ pal.key }}</div>
              <q-separator></q-separator>
              <div>
                Fangrate
                <div class="flex align-center q-gutter-sm">
                  <q-img v-for="i in pal.value > 10 ? 10 : pal.value" :key="i" src="../assets/palsphere.png" width="28px"></q-img>
                  <q-img v-for="i in 10 - pal.value < 0 ? 0 : 10 - pal.value" :key="i" src="../assets/palsphere-grey.png" width="28px"></q-img>
                  <div class="flex flex-center">{{ pal.value }} / 10</div>
                  <q-badge v-if="pal.value >= 10" rounded color="green" label="MAX BONUS" />
                  <!-- #1b2836 -->
                </div>
              </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed  } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'PaldexPage',
  components: {  },
  setup () {
    const currentRoute = useRoute();
      
    // Access route properties
    const currentPath = currentRoute.path;
    const currentParams = currentRoute.params;

    const data = ref();

    const fetchPaldex = async () => {
      const response = await api.get('/paldex/' + currentParams.id);
      data.value = JSON.parse(response.data.fileContents)
    }

    onBeforeMount(fetchPaldex);

    // Computed Properties
    const playerData = computed(() => data.value ? data?.value?.properties?.SaveData?.value?.RecordData?.value : '')

    return {
      data,
      playerData,
      currentPath,
      currentParams: currentParams,
    };
  }
});
</script>
