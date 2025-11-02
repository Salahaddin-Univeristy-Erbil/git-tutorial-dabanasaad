<template>
  <div class="flex-1 flex flex-col h-full bg-gray-50">
    <!-- Chat Header -->
    <div class="p-4 pb-7 bg-white border-b shadow-sm">
      <h2 class="text-lg font-bold">
        {{ activeChat?.name || 'Select a chat' }}
      </h2>
    </div>

    <!-- Messages -->
    <div class="flex-1 p-4 overflow-y-auto space-y-2">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex"
        :class="{ 'justify-end': msg.sender === 'You' }"
      >
        <div
          :class="[
            'p-2 rounded-lg max-w-xs',
            msg.sender === 'You' ? 'bg-indigo-600 text-white' : 'bg-gray-200',
          ]"
        >
          <strong>{{ msg.sender }}:</strong> {{ msg.text }}
        </div>
      </div>
    </div>

    <!-- Input -->
    <form @submit.prevent="sendMessage" class="mt-2 flex gap-2 p-4 border-t bg-white">
      <input
        v-model="newMessage"
        placeholder="Type a message..."
        class="flex-1 p-2 rounded border border-gray-300"
      />
      <button class="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatStore } from '../stores/chatStore';

const chatStore = useChatStore();
const newMessage = ref('');

const activeChat = computed(() => {
  return chatStore.chats.find((c) => c.id === chatStore.activeChatId) || null;
});

const messages = computed(() => activeChat.value?.messages || []);

const sendMessage = () => {
  if (!chatStore.activeChatId || !newMessage.value.trim()) return;
  chatStore.addMessage(chatStore.activeChatId, 'You', newMessage.value.trim());
  newMessage.value = '';
};
</script>
