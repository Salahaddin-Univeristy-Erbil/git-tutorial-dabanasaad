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
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <!-- Remember Me -->
          <label class="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              v-model="remember"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span>Remember me</span>
          </label>

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
import { authService } from '../services/api';
import { useToast } from '../composables/useToast';

const router = useRouter();
const { success, error } = useToast();

const email = ref('');
const password = ref('');
const remember = ref(false);

const login = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    error('Please fill in all fields');
    return;
  }

  try {
    // ✅ Calls authService.login which handles CSRF cookie
    const data = await authService.login(email.value, password.value, remember.value);

    // Save user info in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));

    success('Login successful!');
    router.push('/chat');
  } catch (err: any) {
    console.error('Login failed:', err.response ? err.response.data : err.message);
    error(err.response?.data?.message || 'Login failed');
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
h1 {
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
