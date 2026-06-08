<template>
  <div class="assign-agency-container">
    <h2>Rattachement d'un Agent</h2>
    <p>Affectez un agent immobilier à sa nouvelle agence de rattachement.</p>

    <form @submit.prevent="assignAgency">

      <div class="form-group">
        <label for="agentSelect">Agent immobilier :</label>
        <select id="agentSelect" v-model="agentId" required>
          <option value="" disabled>Sélectionnez un agent</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.firstname }} {{ user.lastname }} ({{ user.role }})
          </option>
        </select>
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
import { useAssignAgency } from './AssignAgency';

const {
  agencies,
  users,
  agentId,
  selectedAgencyId,
  message,
  messageType,
  isLoading,
  assignAgency
} = useAssignAgency();
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
