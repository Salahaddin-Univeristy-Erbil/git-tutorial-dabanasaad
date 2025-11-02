<template>
  <div id="app">
    <LoadingSpinner />
    <ToastContainer />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from './components/LoadingSpinner.vue';
import ToastContainer from './components/ToastContainer.vue';
</script>
