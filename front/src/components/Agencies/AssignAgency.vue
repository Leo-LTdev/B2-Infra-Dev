<template>
  <div class="assign-agency-container">
    <h2>Rattachement d'un Agent</h2>
    <p>Affectez un agent immobilier à sa nouvelle agence de rattachement.</p>

    <form @submit.prevent="assignAgency">
      
      <div class="form-group">
        <label for="agentId">ID de l'Agent :</label>
        <input type="number" id="agentId" v-model="agentId" min="1" required />
      </div>

      <div class="form-group">
        <label for="agencySelect">Nouvelle Agence :</label>
        <select id="agencySelect" v-model="selectedAgencyId" required>
          <option value="" disabled>Sélectionnez une agence</option>
          <option v-for="agency in agencies" :key="agency.id" :value="agency.id">
            {{ agency.name }} - {{ agency.city }} {{ agency.isHeadquarter ? '(Siège)' : '' }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn" :disabled="isLoading">
        {{ isLoading ? 'En cours de traitement...' : 'Valider le rattachement' }}
      </button>

    </form>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import type { AxiosInstance } from 'axios'

export interface Agency {
  id: number;
  name: string;
  city: string;
  address: string;
  isHeadquarter: boolean;
}

const api = inject<AxiosInstance>('api')

const agencies = ref<Agency[]>([])
const agentId = ref<number>(1)
const selectedAgencyId = ref<number | ''>('')
const message = ref<string>('')
const messageType = ref<'success' | 'error' | ''>('')
const isLoading = ref<boolean>(false)

const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const fetchAgencies = async () => {
  try {
    if (!api) throw new Error("L'instance API n'est pas disponible.")
    
    const response = await api.get('/agencies') 
    agencies.value = response.data
  } catch (error: any) {
    console.error("Erreur de chargement:", error)
    showMessage("Impossible de charger les agences", "error")
  }
}

const assignAgency = async () => {
  isLoading.value = true
  message.value = ''

  try {
    if (!api) throw new Error("L'instance API n'est pas disponible.")

    const response = await api.put(`/agencies/users/${agentId.value}/agency`, {
      agencyId: Number(selectedAgencyId.value)
    })

    showMessage(`Succès : ${response.data.message}`, "success")
    
  } catch (error: any) {
    console.error("Erreur d'assignation:", error)
    const errorMsg = error?.response?.data?.message || error?.response?.data?.error || "Erreur de connexion au serveur"
    showMessage(`Erreur : ${errorMsg}`, "error")
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchAgencies()
})
</script>

<style scoped>
.assign-agency-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

h2 { color: #2c3e50; text-align: center; margin-top: 0; }
p { color: #64748b; text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1.25rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #334155; }
input, select { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; font-size: 1rem; }
.btn { width: 100%; padding: 0.75rem; background-color: var(--primary-color, #42b883); color: white; border: none; border-radius: 4px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
.btn:hover:not(:disabled) { background-color: var(--primary-hover, #33a06f); }
.btn:disabled { background-color: #94d8b9; cursor: not-allowed; }
.message { margin-top: 1rem; padding: 0.75rem; border-radius: 4px; text-align: center; font-weight: 500; }
.success { background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
.error { background-color: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
</style>