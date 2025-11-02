<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Don't have an account?
        <span
          @click="$emit('switchToRegister')"
          class="text-indigo-600 cursor-pointer"
          >Register</span
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const username = ref("");
const password = ref("");

const login = () => {
  if (!username.value.trim() || !password.value.trim()) return;
  const dummyId = Math.random().toString(36).substring(2, 10); // generate random ID
  userStore.setUser(dummyId, username.value.trim());
};
</script>
