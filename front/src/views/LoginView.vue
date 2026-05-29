<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import type { AxiosInstance } from 'axios'

const router = useRouter()

const email = ref('')          // détecté comme type 'string'
const password = ref('')       // détecté comme type 'string'
const errorMessage = ref('')   // détecté comme type 'string'
const isLoading = ref(false)   // détecté comme type 'boolean'

const api = inject<AxiosInstance>('api')

const handleLogin = async () => {
  try {

    if (!api) {
      errorMessage.value = 'API instance is not available.'
      return
    }
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    
    console.log('Connecté ! Voici les données :', response?.data)
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Une erreur est survenue lors de la connexion.'
    console.error('Erreur lors de la connexion', error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Connexion — Ymmo</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input v-model="email" type="email" id="email" required placeholder="exemple@ymmo.fr" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input v-model="password" type="password" id="password" required placeholder="••••••••" />
        </div>
        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>