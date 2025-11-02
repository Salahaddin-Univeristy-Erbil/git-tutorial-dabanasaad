<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-200">
    <!-- Main register content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <!-- Project Title -->
        <h1 class="text-4xl font-extrabold text-indigo-600 text-center mb-8">KOR</h1>

        <h2 class="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>

        <!-- Register Form -->
        <form @submit.prevent="register" class="space-y-4">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <!-- Gender Selection -->
          <select
            v-model="gender"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            required
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <span @click="goToLogin" class="text-indigo-600 cursor-pointer font-medium"> Login </span>
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

const name = ref('');
const email = ref('');
const gender = ref('');
const password = ref('');
const password_confirmation = ref('');

const register = async () => {
  // Validation
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !gender.value ||
    !password.value.trim() ||
    !password_confirmation.value.trim()
  ) {
    error('Please fill in all fields');
    return;
  }

  if (password.value !== password_confirmation.value) {
    error('Passwords do not match');
    return;
  }

  if (password.value.length < 8) {
    error('Password must be at least 8 characters');
    return;
  }

  try {
    // Call API - loading spinner shows automatically
    const data = await authService.register({
      name: name.value,
      email: email.value,
      gender: gender.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });

    // Save token and user
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Show success message
    success('Registration successful!');

    // Redirect to chat
    router.push('/chat');
  } catch (err) {
    // Error toast shows automatically from interceptor
    console.error('Registration failed:', err);
  }
};

const goToLogin = () => {
  router.push('/');
};
</script>

<style scoped>
h1 {
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
