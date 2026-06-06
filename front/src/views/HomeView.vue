<script setup lang="ts">
  import BienCard from '@/components/BienCard.vue'
  import { inject, ref, onMounted, watch } from 'vue'
  import type { AxiosInstance } from 'axios'

  const filterType = ref<string>('tous')
  const filterOrder = ref<boolean>(false)
  const ville = ref<string>('')
  const prixMin = ref<number | null>(null)
  const prixMax = ref<number| null>(null)
  const surfaceMin = ref<number| null>(null)
  const surfaceMax = ref<number| null>(null)
  
  const api = inject<AxiosInstance>('api')
  const allBien = ref<any[]>([])

  const getAllBien = async () => {
    if (!api) {throw new Error('API instance not provided via injection')}
    try { 
      const response = await api.get('/bien', {
        params: {
          prixMin: prixMin.value || null,
          prixMax: prixMax.value || null,
          surfaceMin: surfaceMin.value || null,
          surfaceMax: surfaceMax.value || null,
          lieu: ville.value || null,
          type: filterType.value || null,
          order: filterOrder.value || null,
        }
      })
      
      allBien.value = response.data.allBien
      
      console.log('Mes données reçues :', allBien.value)
    } catch (error) {
      console.error('Erreur lors de la récupération des biens :', error)
    }
  }

  watch([prixMin, prixMax, surfaceMin, surfaceMax, ville, filterType, filterOrder], () => {
    getAllBien()
  })

  onMounted(() => { getAllBien() })
  


</script>

<template>
  <div class="page-container">
    <header>
      <h1>🏠 Trouver un bien immobilier</h1>
    </header>

    <section class="filters-bar">
      <div class="filter-group">
        <label>Type de bien</label>
        <select v-model="filterType">
          <option value="tous">Tous les biens</option>
          <option value="Residentiel">Résidentiel</option>
          <option value="Professionnel">Professionnel</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Ordre par prix</label>
        <select v-model="filterOrder">
          <option value="false">Croissant</option>
          <option value="true">Décroissant</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Rechercher une ville</label>
        <input 
          v-model="ville" 
          type="text" 
          placeholder="Ex: Paris, Lyon..." 
        />
      </div>

      <div class="filter-group">
        <label>Prix Min</label>
        <input 
          v-model.number="prixMin" 
          type="number" 
          placeholder="0" 
        />
      </div>

      <div class="filter-group">
        <label>Prix Max</label>
        <input 
          v-model.number="prixMax" 
          type="number" 
          placeholder="250000" 
        />
      </div>

      <div class="filter-group">
        <label>Surface Min</label>
        <input 
          v-model.number="surfaceMin" 
          type="number" 
          placeholder="0" 
        />
      </div>

      <div class="filter-group">
        <label>Surface Max</label>
        <input 
          v-model.number="surfaceMax" 
          type="number" 
          placeholder="250" 
        />
      </div>
    </section>

    <main>
      <p class="results-count">{{ allBien.length }} bien(s) trouvé(s)</p>
      
      <div class="grid-biens">
        <BienCard 
          v-for="bien in allBien" 
          :key="bien.id" 
          :bien="bien" 
        />
      </div>

      <div v-if="allBien.length === 0" class="no-results">
        Désolé, aucun bien ne correspond à vos critères.
      </div>
    </main>
  </div>
</template>


<style scoped>
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Roboto, sans-serif;
    background-color: #f8fafc;
    min-height: 100vh;
  }
  header h1 { color: #0f172a; margin-bottom: 24px; }

  /* Styles de la barre de filtres */
  .filters-bar {
    display: flex;
  
    flex-wrap: wrap;
    gap: 20px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    margin-bottom: 24px;
  }
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 200px;
    max-width: 200px;
  }
  .filter-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
  .filter-group select, .filter-group input {
    padding: 10px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
  }
  .filter-group select:focus, .filter-group input:focus { border-color: #3b82f6; }

  /* Grille Responsive */
  .results-count { color: #64748b; margin-bottom: 16px; }
  .grid-biens {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  .no-results { text-align: center; padding: 40px; color: #64748b; font-size: 1.1rem; }
</style>