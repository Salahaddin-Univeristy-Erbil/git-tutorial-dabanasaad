<template>
  <div class="flex p-4 border-t bg-gray-100">
    <input
      v-model="text"
      placeholder="Type a message..."
      class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      @keyup.enter="send"
    />
    <button
      @click="send"
      class="ml-2 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 transition"
    >
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "../stores/chatStore";

const chatStore = useChatStore();
const text = ref("");

function send() {
  if (!text.value.trim() || !chatStore.activeChatId) return;
  const chat = chatStore.chats.find((c) => c.id === chatStore.activeChatId);
  if (!chat) return;

  // Add the message
  chatStore.addMessage(chat.id, "You", text.value.trim());
  text.value = "";
}
</script>
