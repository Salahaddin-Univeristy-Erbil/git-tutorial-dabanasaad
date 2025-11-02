<template>
  <div class="h-screen flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <!-- Show chat header -->

      <!-- Chat conversation -->
      <ChatWindow />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useChatStore } from '../stores/chatStore';
import Sidebar from '../components/Sidebar.vue';
import ChatWindow from '../components/ChatWindow.vue';

const chatStore = useChatStore();

const activeChat = computed(() => {
  return chatStore.chats.find((c) => c.id === chatStore.activeChatId) || null;
});
</script>
