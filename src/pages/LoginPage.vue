<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-200">
    <!-- Main login content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <!-- Project Title -->
        <h1 class="text-4xl font-extrabold text-indigo-600 text-center mb-8">KOR</h1>

        <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>

        <!-- Login Form -->
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

        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <span @click="goToRegister" class="text-indigo-600 cursor-pointer font-medium">
            Register
          </span>
        </p>
      </div>
    </div>

    <!-- Separated Footer -->
    <footer class="bg-white mt-8 py-4 text-center text-gray-500 shadow-inner">
      &copy; {{ new Date().getFullYear() }} KOR. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const username = ref('');
const password = ref('');

const login = () => {
  if (!username.value.trim() || !password.value.trim()) return;

  const dummyId = Math.random().toString(36).substring(2, 10);
  userStore.setUser(dummyId, username.value.trim());

  router.push('/chat'); // redirect to chat page after login
};

const goToRegister = () => {
  router.push('/register'); // navigate to register page
};
</script>

<style scoped>
h1 {
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
