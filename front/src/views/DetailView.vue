<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { inject, ref, onMounted } from 'vue'
  import type { AxiosInstance } from 'axios'

  const router = useRouter()
  const route = useRoute()

  const bienId = route.params.id;

  const api = inject<AxiosInstance>('api')
  const bien = ref<any>()

  const getBien = async () => {
    if (!api) {throw new Error('API instance not provided via injection')}
    try {

        const response = await api.get(`/api/bien/${bienId}`)

        bien.value = response
    } catch (error) {
        console.error('Erreur lors de la récupération des biens :', error)
    }
  }

  onMounted(() => {
    getBien()
  })
</script>

<template>


</template>

<style scoped>
</style>