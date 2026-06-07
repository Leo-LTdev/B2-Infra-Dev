<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f5f7fb; 
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #2b59c3 !important;
  box-shadow: 0 0 0 3px rgba(43, 89, 195, 0.15);
}
</style>