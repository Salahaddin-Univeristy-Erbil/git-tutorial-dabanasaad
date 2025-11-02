<template>
  <div class="w-64 bg-gray-100 flex flex-col h-full relative">
    <!-- Sidebar header -->
    <div class="flex items-center p-4 border-b border-gray-300 justify-between relative">
      <span class="font-bold text-lg">Chat</span>
      <img
        :src="userStore.avatarUrl"
        class="w-10 h-10 rounded-full cursor-pointer"
        @click="dropdownOpen = !dropdownOpen"
      />
    </div>

    <!-- Avatar dropdown menu -->
    <transition name="fade">
      <div v-if="dropdownOpen" class="absolute mt-16 ml-4 bg-white shadow-lg rounded p-2 w-48 z-10">
        <button @click="viewProfile" class="w-full text-left p-2 hover:bg-gray-100 rounded">
          See Profile
        </button>
        <button @click="changeAvatar" class="w-full text-left p-2 hover:bg-gray-100 rounded">
          Change Avatar
        </button>
        <button @click="logout" class="w-full text-left p-2 hover:bg-gray-100 rounded">
          Logout
        </button>
        <button
          @click="dropdownOpen = false"
          class="w-full text-left p-2 hover:bg-gray-100 rounded"
        >
          Close
        </button>
      </div>
    </transition>

    <!-- Chat list -->
    <div class="flex-1 overflow-y-auto mt-2 px-2">
      <button
        v-for="chat in chatStore.chats"
        :key="chat.id"
        @click="chatStore.setActiveChat(chat.id)"
        class="w-full p-3 hover:bg-gray-200 text-left rounded transition"
        :class="{ 'bg-gray-300 font-bold': chatStore.activeChatId === chat.id }"
      >
        {{ chat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '../stores/chatStore';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const chatStore = useChatStore();
const userStore = useUserStore();
const dropdownOpen = ref(false);
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push('/'); // navigate to login page
  dropdownOpen.value = false;
};

const changeAvatar = () => {
  const newUrl = prompt('Enter new avatar URL');
  if (newUrl) userStore.changeAvatar(newUrl);
  dropdownOpen.value = false;
};

const viewProfile = () => {
  router.push('/profile');
  dropdownOpen.value = false;
};
</script>

<style scoped>
/* Fade transition for dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
