<template>
  <div class="bg-primary text-white flex justify-between items-center p-4">
    <h1 class="text-xl font-bold">💬 Vue Messenger</h1>
    <div>{{ username }}</div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/userStore";
const userStore = useUserStore();
const username = userStore.username;
</script>
