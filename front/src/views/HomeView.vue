<script setup lang="ts">
  import BienCard from '@/components/BienCard.vue'
  import { inject, ref, onMounted } from 'vue'
  import type { AxiosInstance } from 'axios'

  const api = inject<AxiosInstance>('api')
  const allBien = ref<any[]>([])

  const getAllBien = async () => {
    if (!api) {
      throw new Error('API instance not provided via injection')
    }

    try {
      const response = await api.get('/bien')
      
      allBien.value = response.data.allBien
      
      console.log('Mes données reçues :', allBien.value)
    } catch (error) {
      console.error('Erreur lors de la récupération des biens :', error)
    }
  }

  onMounted(() =>{
    getAllBien()
  })


</script>

<template>
  <main>
    <BienCard
      v-for="bien in allBien"
      :key="bien.id"
      :bien="bien"
    />
  </main>
</template>
