<template>
  <div class="p-8 flex flex-col items-center bg-gray-50 min-h-screen">
    <img
      :src="userStore.avatarUrl"
      alt="avatar"
      class="w-32 h-32 rounded-full border-4 border-indigo-600 mb-4"
    />
    <h1 class="text-2xl font-bold mb-2">{{ userStore.username }}</h1>
    <p class="text-gray-600 text-center mb-4">{{ bio }}</p>

    <!-- Edit Profile Button -->
    <button
      @click="modalOpen = true"
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-4"
    >
      Edit Profile
    </button>

    <button
      @click="goBack"
      class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
    >
      Back to Chat
    </button>

    <!-- Modal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 class="text-xl font-bold mb-4">Edit Profile</h2>

        <label class="block mb-2 font-semibold">Avatar URL:</label>
        <input
          v-model="newAvatar"
          type="text"
          placeholder="Enter avatar URL"
          class="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label class="block mb-2 font-semibold">Bio:</label>
        <textarea
          v-model="newBio"
          rows="3"
          placeholder="Enter your bio"
          class="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>

        <div class="flex justify-end gap-2">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const bio = ref('This is a sample bio. You can update it later.');

// Modal states
const modalOpen = ref(false);
const newAvatar = ref(userStore.avatarUrl);
const newBio = ref(bio.value);

const goBack = () => {
  router.push('/chat');
};

const closeModal = () => {
  modalOpen.value = false;
  // Reset values when cancel
  newAvatar.value = userStore.avatarUrl;
  newBio.value = bio.value;
};

const saveChanges = () => {
  userStore.changeAvatar(newAvatar.value);
  bio.value = newBio.value;
  modalOpen.value = false;
};
</script>
